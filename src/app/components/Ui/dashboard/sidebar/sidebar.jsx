"use client"
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import {
    MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,MdOutlineSchool ,MdQuickreply,
 
  
} 

from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaRegCalendarCheck,FaUserGraduate, } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { SiAlchemy } from "react-icons/si";
import * as Realm from 'realm-web';

const menuItems = [

    {
      title: "Home Page",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "User",
          path: "/dashboard/users",
          icon: <FaUserGraduate />,
        },
        {
          title: "Courses",
          path: "/dashboard/products",
          icon: <MdOutlineSchool />,
        },
        {
          title: "Notifications",
          path: "/dashboard/transactions",
          icon: <IoIosNotifications />,
        },
      ],
    },
    {
      title: "Progress",
      list: [
        {
          title: "Progress Tracker",
          path: "/dashboard/revenue",
          icon: <GrInProgress />,
        },
        {
          title: "Announcments",
          path: "/dashboard/reports",
          icon: <MdQuickreply />,
        },
        {
          title: "Calendar",
          path: "/dashboard/teams",
          icon:<FaRegCalendarCheck />,
        },
      ],
    },
    {
      title: "About",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];


const Sidebar = ()=>{
  const [user, setUser] = useState({ name: "Loading..." });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
        const user = app.currentUser; // Ensure 'app' and 'currentUser' are properly defined and available
        const token = user ? user._accessToken : null; // Use the correct token property
  
        const response = await fetch('/api/getUser', {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to the getUser request
            // Include other headers as needed
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

  const handleLogout = () => {
    // Redirect the user to the homepage
    router.push('/');
  
    // Add a delay (e.g., 2 seconds) before setting user to null
    const delay = 7000; // 2 seconds
  
    setTimeout(() => {
      setUser(null);
    }, delay);
  };
  

    return (
        <div className = {styles.container}>
          <span className={styles.userHeader}> <SiAlchemy />               Alchemi</span>
            <div className = {styles.user}>
                <Image className = {styles.userImage} src="/noavatar.png" alt="" width="50" height="50"/>
                <div className = {styles.userDetail}>
                <span className = {styles.userTitle}>Welcome</span>
                    <span className = {styles.username}>{user.name}</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat)=>(
                    <li key = {cat.title}>
                        <span className = {styles.cat}>{cat.title}</span>
                        {cat.list.map((item)=>(
                            <MenuLink item = {item} key={item.title}/>
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout} onClick={handleLogout}>
            <MdLogout /> Logout

</button>

        </div>
    )
}

export default Sidebar;