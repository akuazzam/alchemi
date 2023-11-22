"use client"
import React from 'react';
import { signInWithGoogle } from "./firebase/auth"
import Dashboard from "./components/dashboard/dash"

const Home = () => {
  return (
    <div>
      {<button onClick={signInWithGoogle}>Sign in with Google</button>}
      <Dashboard/>
    </div>
  );
};

export default Home;