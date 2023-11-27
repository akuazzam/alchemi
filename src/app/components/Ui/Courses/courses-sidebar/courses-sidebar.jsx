"use client"
import MenuLink from "./courses-menu/courses-menu";
import styles from "./courses-sidebar.module.css";
import Image from "next/image";
import { SiAlchemy } from "react-icons/si";
import { useState, useEffect } from "react";
import {

  MdOutlineSettings,
  MdLogout,
 
 
} from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";
import { SiChatbot } from "react-icons/si";
import { TbCardsFilled } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { MdQuiz } from "react-icons/md";
import * as Realm from 'realm-web';


const mainMenuItems = [
  {
    title: "Return Home",
    path: "/components/dashboard",
    icon: <IoMdReturnLeft />,
  },
  {
    title: "Quiz",
    path: "/dashboard/quiz",
    icon: <MdQuiz />,
  },
  {
    title: "ChatBot",
    path: "/dashboard/chatbot",
    icon: <SiChatbot />,
  },
  {
    title: "Flash Card",
    path: "/dashboard/flashcard",
    icon: <TbCardsFilled />,
  },
  {
    title: "Sticky Notes",
    path: "/dashboard/stickynotes",
    icon: <FaNoteSticky />,
  },
];
 
const settingsMenuItem = {
  title: "Settings",
  path: "/dashboard/settings",
  icon: <MdOutlineSettings />,
};
 
const Sidebar = () => {
  const [user, setUser] = useState({ name: "Loading..." });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUserId = localStorage.getItem('userId');
      console.log('Local Storage UserId:', localUserId); // Debug log
      setUserId(localUserId);
    }
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        const response = await fetch('/api/getUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include an Authorization header if you are using a token-based auth
            // 'Authorization': `Bearer ${userToken}`,
          },
          body:  JSON.stringify({  userId }) ,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser({ name: userData.name, title: userData.title || 'User' });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
  }, [userId]);
  const handleLogout = () => {
    // Redirect the user to the homepage
    router.push("/components/login");
    localStorage.removeItem('userId');

    // Add a delay (e.g., 2 seconds) before setting user to null
    const delay = 7000; // 2 seconds

    setTimeout(() => {
      setUser(null);
    }, delay);
  };
  return (
<div className={styles.container}>
<span className={styles.userHeader}> <SiAlchemy />               Alchemi</span>
<div className={styles.user}>
<Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50" />
<div className={styles.userDetail}>
<span className={styles.username}>{user.name}</span>
</div>
</div>
<ul className={styles.list}>
        {mainMenuItems.map((item) => (
<MenuLink item={item} key={item.title} />
        ))}
</ul>
<div className={styles.bottomItems}>
<MenuLink item={settingsMenuItem} />
<button className={styles.logout} onClick={handleLogout}>
<MdLogout /> Logout
</button>
</div>
</div>
  );
};
 
export default Sidebar;