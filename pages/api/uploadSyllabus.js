// pages/api/upload.js
import { createRouter } from "next-connect";
import multer from "multer";
import fs from "fs";
import {
  AzureKeyCredential as FormRecognizerAzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";
import {
  TextAnalysisClient,
  AzureKeyCredential,
} from "@azure/ai-language-text";

// Initialize multer with a temporary storage for uploaded files
const upload = multer({ dest: "/tmp/uploads/" });

// Initialize the router
const router = createRouter();

const summarizeText = async (text) => {
  const client = new TextAnalysisClient(
    process.env.LANGUAGE_ENDPOINT,
    new AzureKeyCredential(process.env.LANGUAGE_KEY)
  );
  const actions = [
    {
      kind: "ExtractiveSummarization",
      maxSentenceCount: 20,
    },
  ];
  const documents = [{ id: "1", language: "en", text }];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");

  try {
    const results = await poller.pollUntilDone();
    for await (const actionResult of results) {
      if (actionResult.kind !== "ExtractiveSummarization") {
        throw new Error(`Expected extractive summarization results but got: ${actionResult.kind}`);
      }
      for (const result of actionResult.results) {
        return result.sentences.map((sentence) => sentence.text).join("\n");
      }
    }
  } catch (error) {
    console.error("Error during text summarization:", error);
    throw error; // Rethrow the error to be caught in the main handler
  }
};

router.post(upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Read the file from the temporary storage
  const fileBuffer = await fs.promises.readFile(req.file.path);

  // Initialize Azure DocumentAnalysisClient with your credentials
  const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
  const credential = new FormRecognizerAzureKeyCredential(
    process.env.AZURE_FORM_RECOGNIZER_KEY
  );
  const client = new DocumentAnalysisClient(endpoint, credential);

  try {
    // Call Azure service using the file buffer
    const poller = await client.beginAnalyzeDocument("Alchemi3", fileBuffer);
    const result = await poller.pollUntilDone();
    const textContent = result.content;

    let summary;
    try {
      summary = await summarizeText(textContent);
    } catch (error) {
      // Handle errors from the summarization process
      console.error("Summarization error:", error);
      summary = "Summary could not be generated due to an error.";
    }

    // Extract specific fields from the result, set to null if not present
    const extractedData = {
      CourseDescription: result.documents[0].fields.CourseDescription?.content || null,
      CourseContentAndLearningObjectives: result.documents[0].fields["Course Content and Learning Objectives"]?.content || null,
      RequiredLectureTextbook: result.documents[0].fields["Required Lecture Textbook"]?.content || null,
      Summary: summary
    };

    // Respond with the extracted fields
    return res.status(200).json({ extractedData });
  } catch (error) {
    console.error("An error occurred while processing the document:", error);
    return res.status(500).json({ error: "An error occurred while processing the document." });
  } finally {
    // Cleanup: delete the temporary file
    fs.promises.unlink(req.file.path).catch(cleanupError => {
      console.error("Failed to delete temporary file:", cleanupError);
    });
  }
});

// Export the route handler with additional Next.js configuration
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    return res.status(500).end("Internal Server Error");
  },
  onNoMatch: (req, res) => {
    return res.status(404).end("API route not found");
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
