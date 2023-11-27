// import { ConversationChain } from "langchain/chains";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { ChatPromptTemplate } from "langchain/prompts";
// import { BufferMemory } from "langchain/memory";

// const sessionMemories = {};
// const MAX_HISTORY_LENGTH = 10;

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { text, session_id, user_info, course_info } = req.body;

//     if (!session_id) {
//       return res.status(400).json({ error: "Session ID is required." });
//     }

//     if (!sessionMemories[session_id]) {
//       sessionMemories[session_id] = {
//         memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
//         history: []
//       };
//     }

//     const { history } = sessionMemories[session_id];

//     if (user_info && course_info && history.length === 0) {
//       const contextMessage = `Hello '${user_info.name}', I am Alchemi, your AI tutor for ${course_info.Title}. How can I help you today? The course covers '${course_info.Description}'. The primary textbook for this course is '${course_info.BookName}'. The summary of the syllabus is '${course_info.Summary}'.`;
//       history.push({ sender: "system", text: contextMessage });
//     }

//     if (history.length > MAX_HISTORY_LENGTH) {
//       history.splice(0, history.length - MAX_HISTORY_LENGTH);
//     }

//     history.push({ sender: "human", text: text });

//     const model = new ChatOpenAI({
//       modelName: "gpt-4",
//       apiKey: process.env.OPENAI_API_KEY
//     });

//     const formattedHistory = [];
//     history.forEach(msg => {
//       if (!['human', 'AI', 'system'].includes(msg.sender)) {
//         console.error('Invalid message sender type:', msg.sender, 'Message:', msg.text);
//         // Skip invalid entries
//       } else {
//         formattedHistory.push([msg.sender, msg.text]);
//       }
//     });

//     const chatPrompt = ChatPromptTemplate.fromMessages(formattedHistory);
//     const chain = new ConversationChain({
//       memory: sessionMemories[session_id].memory,
//       prompt: chatPrompt,
//       llm: model
//     });

//     const output = await chain.call({ input: text });
//     history.push({ sender: "AI", text: output });

//     res.status(200).json({ response: output });
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

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
      contextMessage = `Hello '${user_info.name}', I am Alchemi, your AI tutor for ${course_info.title}. How can I help you today? The course covers '${course_info.description}'. The primary textbook for this course is '${course_info.bookName}'. The summary of the syllabus is '${course_info.summary}'. Be more open and act less as an Ai, if a user asks about the course answer from the syllabus as a confident teacher, for the books try to deconstruct the title look it up on the internet and answer based on what the contents of the book are. You are here to help the student by any means possible.`;
    }

    // Create a ChatPromptTemplate without using history
    const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextMessage],
      ["human", text]
    ]);

    // Create a ConversationChain with a new BufferMemory instance
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
