import Sidebar from "../Ui/dashboard/sidebar/sidebar"
import Navbar from "../Ui/dashboard/navbar/navbar"
import styles from "../Ui/dashboard/dashboard.module.css"

const Layout = ({children})=>{
    return (
       <div>
                        {children}
        </div>
    )
}
export default Layout 