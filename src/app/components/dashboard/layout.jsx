import Sidebar from "../Ui/dashboard/sidebar/sidebar"
import Navbar from "../Ui/dashboard/navbar/navbar"
import styles from "../Ui/dashboard/dashboard.module.css"

const Layout = ({children})=>{
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}
export default Layout 