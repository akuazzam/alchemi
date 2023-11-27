"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/components/Ui/login/signup/profile/profile.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Dashboard from "@/app/components/dashboard/page";
import { SiAlchemy } from "react-icons/si";

const ProfileCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    school: "",
    email: "",
  });


  // State to hold the router object
  const router = useRouter();

  // useEffect to ensure useRouter is called in the client-side environment
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);

    event.preventDefault();
    let userId; // Declare userId outside the conditional block

    if (typeof window !== 'undefined') {
      userId = localStorage.getItem('userId'); // Assign value inside the block
    }
    const userData = {
      Name: formData.name,
      Email: formData.email,
      Major: formData.major,
      School: formData.school,
      User: userId,
    };

    // Get the current logged-in user
    try {
      const response = await fetch("/api/createUser", {
        // Adjust the endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("User created successfully:", result);
      // Handle successful response here (e.g., show a success message, clear form, etc.)
      router.push("/components/dashboard"); // Make sure '/dashboard' is the correct path to your dashboard
    } catch (error) {
      console.error("Failed to create course:", error);
      // Handle errors here (e.g., show error message)
    }
    setIsLoading(false);
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.brandName}>
          <SiAlchemy /> Alchemi
        </div>
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
            name="email"
            placeholder="email"
            value={formData.email}
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <button type="submit">Complete Profile</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileCreation;
