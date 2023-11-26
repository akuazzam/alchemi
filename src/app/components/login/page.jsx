"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/components/Ui/login/login.module.css";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { SiAlchemy } from "react-icons/si";
import * as Realm from 'realm-web';


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
  const user = app.currentUser;
  const token = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const response = await fetch("/api/Login", {
        // Update with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "MyAuthorization": `Bearer ${token}`,

        },
        body: JSON.stringify({ email, password }),
      });
     

      if (response.ok) {
        // Navigate to main page on successful login
        router.push("/components/dashboard"); // Update with your actual main page route
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setIsLoading(false);
  };
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.brandName}><SiAlchemy />Alchemi</div>
      </header>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <button type="submit">Login</button>
          )}

          <Link href="/components/login/signup">
            Dont have an account? Sign Up here!
          </Link>
        </form>
      </div>
    </div>
  );
}
