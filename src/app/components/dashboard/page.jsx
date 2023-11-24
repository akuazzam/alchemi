"use client"
import React, { useState } from 'react';
import styles from '../Ui/dashboard/dashboard.module.css'; // Ensure you have a corresponding CSS module file
 
const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', imageUrl: '' });
 
  const handleAddCourse = () => {
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    setNewCourse({ title: '', imageUrl: '' }); // Reset form
    setShowAddCourse(false); // Close the form
  };
 
  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };
 
  return (
<div className={styles.dashboard}>
      {courses.map((course) => (
<div key={course.id} className={styles.card}>
<img src={course.imageUrl} alt={course.title} className={styles.cardImage} />
<h3 className={styles.cardTitle}>{course.title}</h3>
</div>
      ))}
<div className={styles.addCourseButton} onClick={() => setShowAddCourse(true)}>
<div className={styles.plusIcon}>+</div>
<div className={styles.addCourseText}>Add Courses</div>
</div>
 
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
  );
};
 
export default Dashboard;