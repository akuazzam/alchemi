import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import Image from "next/image";

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
 
  
} from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaRegCalendarCheck,FaUserGraduate, } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { SiAlchemy } from "react-icons/si";
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
    return (
        <div className = {styles.container}>
          <span className = {styles.userHeader}>Alchemi</span>
            <div className = {styles.user}>
                <Image className = {styles.userImage} src="/noavatar.png" alt="" width="50" height="50"/>
                <div className = {styles.userDetail}>
                    <span className = {styles.username}>Champagne Papi</span>
                    <span className = {styles.userTitle}>Welcome</span>
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