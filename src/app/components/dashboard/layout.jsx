import Sidebar from "../Ui/dashboard/sidebar/sidebar"
import Navbar from "../Ui/dashboard/navbar/navbar"

const Layout = ({children})=>{
    return (
        <div className={styles.contaier}>
            <div>
                <Sidebar/>
            </div>
            <div>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}
export default Layout 