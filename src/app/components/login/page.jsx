import styles from "@/app/components/Ui/login/login.module.css";
import Link from 'next/link';


export default function LoginPage() {
  // The rest of your login logic

  return (
    <div className={styles.container}>
        <form action="" className={styles.form}>
                <h1>Login</h1>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Login</button>
                <Link href="/components/login/signup">Don't have an account? Sign Up here!</Link>
        </form>
    </div>
  );
}




