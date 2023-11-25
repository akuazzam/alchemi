import MenuLink from "./courses-menu/courses-menu";
import styles from ".//courses-sidebar.module.css";
import Image from "next/image";
import {
  MdOutlineSettings,
  MdLogout, 
} from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";
import { SiChatbot } from "react-icons/si";
import { TbCardsFilled } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { MdQuiz } from "react-icons/md";
 
const mainMenuItems = [
  {
    title: "Return Home",
    path: "/dashboard",
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
  return (
<div className={styles.container}>
<span className={styles.userHeader}>Alchemi</span>
<div className={styles.user}>
<Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50" />
<div className={styles.userDetail}>
<span className={styles.username}>Champagne Papi</span>
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