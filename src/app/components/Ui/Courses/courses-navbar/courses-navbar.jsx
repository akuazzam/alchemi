"use client"
import { useState } from 'react';
import { usePathname } from "next/navigation";
import styles from './courses-navbar.module.css';
import { MdNotifications, MdChatBubbleOutline, /*MdPublic,*/ MdSearch, MdWindow } from "react-icons/md";

const Navbar = () => {
    const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
    const pathname = usePathname();

    const handleCoursesDropdown = () => {
        setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathname.split("/").pop()}</div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    <MdSearch />
                    <input type="text" placeholder="Search..." className={styles.input}/>
                </div>
                <div className={styles.icons}>
                    <MdChatBubbleOutline size={20} />
                    <MdNotifications size={20} />
                    <div className={styles.courseDropdownIcon} onClick={handleCoursesDropdown}>
                        <MdWindow size={20} />
                    </div>
                    {isCoursesDropdownOpen && (
                        <div className={styles.coursesDropdown}>
                            {/* Render your course links here */}
                            <a href="/courses/course1">Course 1</a>
                            <a href="/courses/course2">Course 2</a>
                            {/* Add more course links as needed */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
