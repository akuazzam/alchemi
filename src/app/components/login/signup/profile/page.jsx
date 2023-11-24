"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/app/components/Ui/login/signup/profile/profile.module.css";
import Dashboard from '@/app/components/dashboard/page';

const ProfileCreation = () => {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    school: '',
    email: ''
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
    const userData = {
      Name: formData.name,
      Email: formData.email,
      Major: formData.major,
      School: formData.school
    };
      console.log('Sending user data:', userData);
    
      try {
        const response = await fetch('/api/createUser', { // Adjust the endpoint as needed
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
          
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log('User created successfully:', result);
        // Handle successful response here (e.g., show a success message, clear form, etc.)
          router.push('/components/dashboard'); // Make sure '/dashboard' is the correct path to your dashboard
      } catch (error) {
        console.error('Failed to create course:', error);
        // Handle errors here (e.g., show error message)
      }
    };
    
   


  return (
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
       
        <button type="submit">Complete Profile</button>
      </form>
    </div>
  )
  };


export default ProfileCreation;
