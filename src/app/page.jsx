"use client"
import React from 'react';
import { signInWithGoogle } from "./firebase/auth"
import Dashboard from "./components/dashboard/page"
import LoginPage from "./components/login/page"
import Navbar from './components/Ui/dashboard/navbar/navbar';

const Home = () => {
  return (
    <div>
      {/* {<button onClick={signInWithGoogle}>Sign in with Google</button>} */}
      HomePage
      <Navbar/>
    </div>
  );
};

export default Home;