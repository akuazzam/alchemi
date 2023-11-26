import Sidebar from "../Ui/Courses/courses-sidebar/courses-sidebar"
import styles from "../Ui/Courses/courses.module.css"

const Layout = ({children})=>{
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
export default Layout 