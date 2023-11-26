"use client"
// useAuth.js

import { createContext, useContext, useState, useEffect } from 'react';
import * as Realm from 'realm-web';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });

  useEffect(() => {
    // Check if the user is already authenticated
    const currentUser = app.currentUser;
    setUser(currentUser);
  }, []);

 
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
