// pages/api/chat.js
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { MessagesPlaceholder, ChatPromptTemplate } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { text, user_info, course_info } = req.body;

    // Construct the introduction message
    const introMessage = `Hello '${user_info.name}', I am Alchemi, your AI tutor for ${course_info.Title}. How can I help you today?`;

    const contextMessage = ` you need to say this to the user when they ask about you  (Hello '${user_info.name}', I am Alchemi, your AI tutor for ${course_info.Title}. How can I help you today?) You are here to help the user understand the course material and answer questions. 
The course covers '${course_info.Description}'. 
The primary textbook for this course is '${course_info.BookName}'.
The summary of the syllabus is '${course_info.Summary}'—please refer to it as you ask questions. Keep in mind this is a university-level course.`;

    // Initialize the chat model
    const model = new ChatOpenAI({
      modelName: "gpt-4",
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create a ChatPromptTemplate with the introMessage and contextMessage
    const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextMessage],
      ["system", introMessage],
      new MessagesPlaceholder("history"), // This will be replaced with chat history
      ["human", "{input}"], // The user's input
    ]);

    // Create a ConversationChain with memory to store chat history
    const chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: chatPrompt,
      llm: model,
    });

    // Process the input
    const output = await chain.call({
      input: text,
    });

    // Respond with the model's output
    res.status(200).json({ response: output });
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
