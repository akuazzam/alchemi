import styles from "@/app/components/Ui/login/login.module.css"

const LoginPage = ()=>{
    return (
        <div className={styles.container}>
            
            <form action="" className={styles.form}>
                <h1>Login</h1>
                <input type="email" placeholder="Email"/>
                <input type="pasword" placeholder="Password"/>
                <button>Login</button>
            </form>
        </div>
    )
}
export default LoginPage 