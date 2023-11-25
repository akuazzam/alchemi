"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/app/components/Ui/login/signup/profile/profile.module.css";
import Dashboard from '@/app/components/dashboard/page';
import { SiAlchemy } from "react-icons/si";

const ProfileCreation = () => {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    school: ''
  });

  // State to hold the router object
  const router = useRouter();

  // useEffect to ensure useRouter is called in the client-side environment


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle profile creation logic here, e.g., send data to your API

    // Redirect to the dashboard after successful profile creation
    // Check if router is available (which indicates we are client-side)
    if (router) {
      router.push('/components/dashboard'); // Make sure '/dashboard' is the correct path to your dashboard
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.brandName}><SiAlchemy />    Alchemi</div>
      </header>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Create Your Profile</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="major"
            placeholder="Major"
            value={formData.major}
            onChange={handleChange}
          />
          <input
            type="text"
            name="school"
            placeholder="School"
            value={formData.school}
            onChange={handleChange}
          />
          <button type="submit">Complete Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreation;
