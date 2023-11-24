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
  MdLogout,
} from "react-icons/md";
const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          icon: <MdShoppingBag />,
        },
        {
          title: "Transactions",
          path: "/dashboard/transactions",
          icon: <MdAttachMoney />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "Revenue",
          path: "/dashboard/revenue",
          icon: <MdWork />,
        },
        {
          title: "Reports",
          path: "/dashboard/reports",
          icon: <MdAnalytics />,
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon: <MdPeople />,
        },
      ],
    },
    {
      title: "User",
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
        const response = await fetch('/api/getUser');
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
        <div className = {styles.container}>
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
            <button className={styles.logout}>Logout</button>
            <MdLogout />
        </div>
    )
}

export default Sidebar;