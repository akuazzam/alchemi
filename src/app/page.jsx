"use client"
import React from 'react';
import { signInWithGoogle } from "./firebase/auth"
import Dashboard from "./components/dashboard/page"
import LoginPage from "./components/login/page"

const Home = () => {
  return (
    <div>
      {<button onClick={signInWithGoogle}>Sign in with Google</button>}
      HomePage
    </div>
  );
};

export default Home;