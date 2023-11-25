import Sidebar from "../Ui/Courses/courses-sidebar/courses-sidebar"
import Navbar from "../Ui/Courses/courses-navbar/courses-navbar"
import styles from "../Ui/Courses/courses.module.css"


const Layout = ({children})=>{
    return (
        <div className={styles.container}>
            
                {children}
            </div>
    )
}
export default Layout 