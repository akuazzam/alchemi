import styles from '../Ui/Courses/courses.module.css'; // Make sure the path is correct

const CoursePage = () => {
  const chapters = [
    { title: 'Chapter 1', description: 'Introduction to the course' },
    { title: 'Chapter 2', description: 'Deep dive into the subject' },
    { title: 'Chapter 3', description: 'Deep dive into the subject' }
    // ... add all your chapters
  ];

  return (
    <div className={styles.chaptersContainer}>
      {chapters.map(chapter => (
        <div key={chapter.title} className={styles.chapterBox}>
          <h3>{chapter.title}</h3>
          <p>{chapter.description}</p>
          {/* Add more content or buttons as needed */}
        </div>
      ))}
    </div>
  );
};

export default CoursePage;
