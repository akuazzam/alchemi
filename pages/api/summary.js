const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const summarizeText = async (text) => {
  const client = new TextAnalyticsClient(
    process.env.AZURE_LANGUAGE_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_LANGUAGE_KEY)
  );

  const actions = {
    extractSummaryActions: [{ modelVersion: "latest", orderBy: "rank" }],
  };
  
  const poller = await client.beginAnalyzeActions([text], actions, "en");
  const resultPages = await poller.pollUntilDone();

  for await (const page of resultPages) {
    const extractSummaryActionResults = page.extractSummaryResults[0];
    if (!extractSummaryActionResults.isError) {
      for (const summary of extractSummaryActionResults.results) {
        console.log("Summary:", summary.summary);
        return summary.summary; // Return the first summary
      }
    } else {
      throw new Error(extractSummaryActionResults.error.message);
    }
  }
};
