// pages/api/upload.js
import { createRouter } from "next-connect";
import multer from "multer";
import fs from "fs";
import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";

// Initialize multer with a temporary storage for uploaded files
const upload = multer({ dest: "/tmp/uploads/" });

// Initialize the router
const router = createRouter();

// Define the API route for file upload and processing
router.post(upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Read the file from the temporary storage
  const fileBuffer = await fs.promises.readFile(req.file.path);

  // Initialize Azure DocumentAnalysisClient with your credentials
  const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
  const credential = new AzureKeyCredential(
    process.env.AZURE_FORM_RECOGNIZER_KEY
  );
  const client = new DocumentAnalysisClient(endpoint, credential);

  try {
    // Call Azure service using the file buffer
    const poller = await client.beginAnalyzeDocument("Alchemi3", fileBuffer);
    const result = await poller.pollUntilDone();
    // Extract specific fields from the result, set to null if not present
    const extractedData = {
      CourseDescription:
        result.documents[0].fields.CourseDescription?.value || null,
      CourseContentAndLearningObjectives:
        result.documents[0].fields["Course Content and Learning Objectives"]
          ?.value || null,
      RequiredLectureTextbook:
        result.documents[0].fields["Required Lecture Textbook"]?.value || null,
    };

    // Respond with the extracted fields
    res.status(200).json({ extractedData });

    // Cleanup: delete the temporary file
    await fs.promises.unlink(req.file.path);
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the document." });

    // Attempt to cleanup even in case of failure
    try {
      await fs.promises.unlink(req.file.path);
    } catch (cleanupError) {
      console.error("Failed to delete temporary file:", cleanupError);
    }
  }
});

// Export the route handler with additional Next.js configuration
export default router.handler({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Internal Server Error");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("API route not found");
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
