"use client"
import React, { useState, useEffect } from 'react';
import styles from '../Ui/dashboard/dashboard.module.css'; // Ensure you have a corresponding CSS module file
import { useRouter } from 'next/navigation';



const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', imageUrl: '' });
  const router = useRouter();

  const handleAddCourse = () => {
    
    router.push('/components/addCourse'); // Replace with actual path
  };

  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/getUserCourses'); // Replace with your API endpoint
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle error here
      }
    };

    fetchCourses();
  }, []);

  const handleStartTutor = async (courseId) => {
    try {
      // Fetch user data
      const userResponse = await fetch('/api/getUser');
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
  
      // Fetch course data
      const courseResponse = await fetch('/api/getUserCourses');
      if (!courseResponse.ok) throw new Error('Failed to fetch courses data');
      const coursesData = await courseResponse.json();
  
      // Select the course based on title
      const selectedCourse = coursesData.find(course => course._id=== courseId);
      if (!selectedCourse) throw new Error('Course not found');
  
      // Send data to Python backend
      fetch('http://localhost:8000/user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: ({
          user_info: userData,
          course_info: selectedCourse,
        }),
      });
  
      // if (!tutorResponse.ok) throw new Error('Failed to start AI tutor');
      // window.location.href = 'http://localhost:8000/';

      // Redirect or notify the user
      console.log('AI tutor started for course:', selectedCourse);
    } catch (error) {
      console.error('Error starting AI tutor:', error);
      // Here you might want to set an error state and display a message to the user
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.dashboard}>
          {courses?.map((course) => (
            <div key={course._id} className={styles.card} onClick={() => handleStartTutor(course._id)}>
              <img src={"course.imageUrl"} alt={course.title} className={styles.cardImage} />
              <h3 className={styles.cardTitle}>{course.Title}</h3>
            </div>
          ))}

          {/* Fixed 'Add Course' button */}
          <div className={styles.addCourseButton} onClick={handleAddCourse}>
            <div className={styles.plusIcon}>+</div>
            <div className={styles.addCourseText}>Add Courses</div>
          </div>
        </div>

        {/* Add Course modal */}
        {showAddCourse && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Add a New Course</h2>
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                value={newCourse.title}
                onChange={handleCourseChange}
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={newCourse.imageUrl}
                onChange={handleCourseChange}
              />
              <button onClick={handleAddCourse}>Submit</button>
              <button onClick={() => setShowAddCourse(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
