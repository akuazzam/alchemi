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
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
        const user = app.currentUser; // Make sure 'app' is imported and 'currentUser' is authenticated
        const token = user ? user._accessToken : null; // Replace 'accessToken' with the correct token property      
        const response = await fetch('/api/getUser', {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers your API requires
          },
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
  }, []);
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
<button className={styles.logout}>
<MdLogout /> Logout
</button>
</div>
</div>
  );
};
 
export default Sidebar;