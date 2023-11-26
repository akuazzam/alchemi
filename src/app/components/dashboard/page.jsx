"use client";
import React, { useState, useEffect } from "react";
import styles from "../Ui/dashboard/dashboard.module.css"; // Ensure you have a corresponding CSS module file
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", imageUrl: "" });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const router = useRouter();

  const handleAddCourse = () => {
    router.push("/components/addCourse"); // Replace with actual path
  };

  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleStartTutor = async () => {
    try {
      // Fetch user data
      const course = courses.find((c) => c._id === courseId);
      if (course) {
        setSelectedCourse(course._id);
        console.log("Selected Course ID:", selectedCourse);

        // Redirect or notify the user
        console.log("AI tutor started for course:", course);

        // router.push("/components/courses"); // Redirect to the courses page
      } else {
        console.error("Course not found");
        // Handle course not found situation, perhaps show an error message to the user
      }
    } catch (error) {
      console.error("Error starting AI tutor:", error);
      // Here you might want to set an error state and display a message to the user
    }
  };

  // finally{  useEffect(() => {
  //   console.log("Selected Course ID after set:", selectedCourse);
  //   // Now 'selectedCourse' should be the updated state, if it's not, something else is wrong.
  // }, [selectedCourse]); }
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/getUserCourses"); // Replace with your API endpoint
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Handle error here
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.dashboard}>
          {isLoading && (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          )}
          {courses?.map((course) => (
            <div key={course._id} className={styles.card}>
              <Link href={`/chat/${course._id}`}>
                <img
                  src={"course.imageUrl"}
                  alt={course.title}
                  className={styles.cardImage}
                />
                <h3 className={styles.cardTitle}>{course.Title}</h3>
              </Link>
            </div>
          ))}

          {/* Fixed 'Add Course' button */}
          <div className={styles.addCourseButton} onClick={handleAddCourse}>
            <div className={styles.plusIcon}>+</div>
            <div className={styles.addCourseText}>Add Courses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
