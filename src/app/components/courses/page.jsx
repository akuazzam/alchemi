"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.css";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Ui/Courses/courses-sidebar/courses-sidebar";
import style from "../Ui/dashboard/dashboard.module.css";
import { useRouter } from "next/navigation";
import * as Realm from 'realm-web';


const Chat = ({ searchParams }) => {
  // Assuming courseId is passed as a prop to identify the course
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});
  const messagesEndRef = useRef(null);
  const sessionId = useRef(uuidv4());
  const router = useRouter();
  const courseId = searchParams.id;
  useEffect(() => {
    // Wait until the router is ready and then access the query parameters
    // Now we can safely destructure courseId
    async function fetchData() {
      const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
      const user = app.currentUser; // Ensure 'app' and 'currentUser' are properly defined and available
      const token = user ? user._accessToken : null; // Use the correct token property
    
      try {
        const [userRes, courseRes] = await Promise.all([
          fetch("/api/getUser", {
            headers: {
              'Authorization': `Bearer ${token}`, // Add token to the getUser request
              // Include other headers as needed
            },
          }),
          fetch("/api/getUserCourses", { // Fetch all courses without passing courseId
            headers: {
              'Authorization': `Bearer ${token}`, // Add token to the getUserCourses request
              // Include other headers as needed
            },
          }),
        ]);

        if (!userRes.ok) throw new Error("Failed to fetch user data");
        if (!courseRes.ok) throw new Error("Failed to fetch course data");

        const userData = await userRes.json();
        const courseData = await courseRes.json();
        // Filter on the client-side for the specific course
        const course = courseData.find((c) => c._id === courseId);
        if (!course) throw new Error("Course not found");

        setUser(userData);
        setCourse(course);

        // Initialize the chat with an introductory message
        const introMessage = {
          type: "bot",
          text: `Hello, I am Alchemi, your AI tutor for ${course.Title}. How can I assist you today?`, // Ensure the property name matches your course data structure
        };
        setMessages([introMessage]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (searchParams.id) {
      fetchData();
    }
  }, [router.isReady, router.query]); // Dependency array with courseId ensures fetch runs only when courseId changes

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const startNewChat = () => {
    setMessages([]); // Clears the chat history
    sessionId.current = uuidv4(); // Generate a new session ID for a new chat
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const humanMessage = { type: "human", text: input };
    setMessages((msgs) => [...msgs, humanMessage]);

    setIsLoading(true);
    try {
      const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });

      const user = app.currentUser;
      const token = user ? user._accessToken : null;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({
          text: input,
          user_info: user, // use the user prop directly
          course_info: course, // use the course prop directly
          session_id: sessionId.current,
        }),
      });

    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      const botText = jsonResponse.response.response;
      setMessages((msgs) => [...msgs, { type: "bot", text: botText }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((msgs) => [
        ...msgs,
        { type: "system", text: "Could not reach the server." },
      ]);
    } finally {
      setIsLoading(false);
    }

    setInput(""); // Clear input after sending
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>{course.Title} Ai tutor</div>
        <div className={styles.menu}>
          <button className={styles.newChatButton} onClick={startNewChat}>
            + New Chat
          </button>
        </div>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.messageContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${styles[message.type]}`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && <div className={styles.loading}>Loading...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <button
            className={styles.sendButton}
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
