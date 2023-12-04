
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { text, session_id, user_info, course_info } = req.body;

    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required." });
    }

    const model = new ChatOpenAI({
      modelName: "gpt-4",
      apiKey: process.env.OPENAI_API_KEY
    });

    // Construct the initial context message if user_info and course_info are provided
    let contextMessage = "";
    if (user_info && course_info) {
      contextMessage = `Hello '${user_info.name}', I am Alchemi, your AI tutor for ${course_info.title}. How can I help you today? The course covers '${course_info.description}'. The primary textbook for this course is '${course_info.bookName}'. The summary of the syllabus is '${course_info.summary}'. Be more open and dont act like an Ai, if a user asks about the course answer from the syllabus as a confident teacher, for the books try to deconstruct the title look it up on the internet and answer based on what the contents of the book are. You are here to help the student by any means possible. Don't go out of context or out of the classes scope if the user asks something irrelavent to the class respond with - out of context`;
      // contextMessage = `👋'${user_info.name}',🤖Alchemi📚${course_info.title}.❓🆘📅.'${course_info.description}'📖'${course_info.bookName}'.📜'${course_info.summary}'.👥🔄🤖,🔍📘➡️💬.🔎🌐📘📖.👨‍🏫🤝💡.  👥🔄🤖❌🎭,👤❓🏫🗣️📚👨‍🏫👍,📖🔍🌐📘💬,🆘👤🚀.`
// new context message coming soon.
    }
    const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextMessage],
      ["human", text]
    ]);

    const chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: chatPrompt,
      llm: model
    });

    // Process the input
    const output = await chain.call({ input: text });

    // Respond with the model's output
    res.status(200).json({ response: output });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
