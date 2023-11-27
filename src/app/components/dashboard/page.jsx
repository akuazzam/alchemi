"use client";
import React, { useState, useEffect } from "react";
import styles from "../Ui/dashboard/dashboard.module.css"; // Ensure you have a corresponding CSS module file
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import Image from "next/image"; // Corrected import statement

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAddCourse = () => {
    router.push("/components/addCourse"); // Replace with actual path
  };
  let userId; // Declare userId outside the conditional block

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId'); // Assign value inside the block
  }
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/getUserCourses", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            // Include an Authorization header if you are using a token-based auth
            // 'Authorization': `Bearer ${userToken}`,
          },
          body: userId,
        });
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          console.log(course);
        } else {
          // If the response is not OK, handle the error
          throw new Error(`Error fetching courses: ${response.statusText}`);
        }
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
              <Link
                href={{
                  pathname: "/components/courses",
                  query: { id: course._id },
                }}
              >
                <Image
                  src={`/images/${course.imageUrl}`}
                  width={100} // Set the desired width
                  height={100} // Set the desired height
                  alt={course.title}
                  className={styles.cardImage}
                />
                <h3 className={styles.cardTitle}>{course.title}</h3>
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
