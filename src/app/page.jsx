"use client"
import React, { useState } from 'react';
// import { signInWithGoogle } from "./firebase/auth";

export default function Home() {

  const [message, setMessage] = useState('');

  async function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {  // Ensure a file was selected
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/extractText.js', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const { content } = await response.json();
          console.log('Extracted Content:', content);
          setMessage('File uploaded successfully!');
        } else {
          // Handle HTTP errors
          console.error("HTTP Error:", response.statusText);
          setMessage('Failed to upload the file.');
        }
      } catch (error) {
        console.error("Network Error:", error.message);
        setMessage('Network error occurred.');
      }
    } else {
      console.error("No file selected");
      setMessage('No file selected.');
    }
  }
  return (
    <main className="p-4">
       <div>
      {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
      <input type="file" onChange={handleFileUpload} />
      {message && <p>{message}</p>} {/* Display feedback message */}
    </div>
    </main>
  )
}
