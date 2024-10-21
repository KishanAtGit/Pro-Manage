import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(
    !localStorage.getItem('userId') ? false : true
  );

  const userLogin = () => {
    setIsSignedIn(true);
  };

  const userLogout = () => {
    localStorage.clear();
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
