"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/app/components/Ui/login/signup/signup.module.css";
import { SiAlchemy } from "react-icons/si";
import Link from 'next/link';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // You might want to redirect the user to the login page or confirm the sign-up
        router.push('/components/login/signup/profile'); // Update with your actual route to the login page
      } else {
        // Handle errors, e.g. display an error message
        console.error('Sign up failed');
      }
    } catch (error) {
      console.error('An error occurred during sign up:', error);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.brandName}><SiAlchemy />        Alchemi</div>
      </header>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Sign Up</h1>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          <Link href="/components/login">Already have an account? Login here!</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
