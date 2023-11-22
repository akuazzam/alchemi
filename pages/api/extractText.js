const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

export default async function handler(req, res) {

  const endpoint = "https://docintlmsft.cognitiveservices.azure.com/";
  const key = "69197686f4804c169ff6b1cdbe80127c";
  // Assuming the formUrl is sent as a query parameter
  const { formUrl } = req.query;

  if (!formUrl) {
    return res.status(400).json({ error: "Missing 'formUrl' query parameter" });
  }

  try {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
    const poller = await client.beginAnalyzeDocument("prebuilt-read", formUrl.toString());
    const result = await poller.pollUntilDone();
    const content = result.content;

    // Returning the 'content' field
    res.status(200).json({ content });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while processing the document" });
  }
}