"use client";
import React, { useState, useEffect } from "react";
import styles from "../Ui/dashboard/dashboard.module.css"; // Ensure you have a corresponding CSS module file
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import Image from 'next/image'; // Corrected import statement
import * as Realm from 'realm-web';


const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAddCourse = () => {
    router.push("/components/addCourse"); // Replace with actual path
  };
  const app = new Realm.App({ id: "alchemi-jpihv" });

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const user = app.currentUser;

      if (!user) {
        console.error('User not logged in');
        setIsLoading(false);
        // Redirect to login or handle unauthenticated user
        return;
      }

      const token = user.accessToken; // Ensure this is the correct property for the token

      try {
        const response = await fetch("/api/getUserCourses", {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers your API requires
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching courses: ${response.statusText}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Optionally, handle error by updating state to show an error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [app.currentUser]); // Depend on currentUser for re-fetching when it changes

 

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
              <Link href={{
                pathname: '/components/courses',
                query:{ id: course._id}
              }}>
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
