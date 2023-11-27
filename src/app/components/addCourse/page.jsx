"use client";
import { useState } from "react";
import styles from "./Upload.module.css";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import * as Realm from "realm-web";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [bookName, setBookName] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSyllabusSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/uploadSyllabus", {
      method: "POST",

      body: formData,
    });

    const data = await response.json();
    if (data.extractedData) {
      setDescription(data.extractedData.CourseDescription || "");
      setContent(data.extractedData.CourseContentAndLearningObjectives || "");
      setBookName(data.extractedData.RequiredLectureTextbook || "");
      setSummary(data.extractedData.Summary || "");
    }
    setFile(null);
    setIsLoading(false);
  };
  const router = useRouter();

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    let userId; // Declare userId outside the conditional block

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId'); // Assign value inside the block
  }
    const courseData = { title, description, content, bookName, summary, userId };
  
    try {
      setIsLoading(true);

      const response = await fetch("/api/createCourse", {
        // Adjust the endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Course created successfully:", result);
      router.push("/components/dashboard"); // Replace '/path-to-dashboard' with the actual path

      // Handle successful response here (e.g., show a success message, clear form, etc.)
    } catch (error) {
      console.error("Failed to create course:", error);
      // Handle errors here (e.g., show error message)
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSyllabusSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <button type="submit">Upload Syllabus</button>
        )}
      </form>

      <form className={styles.form} onSubmit={handleCourseSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Book Name"
        />
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
        />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}
