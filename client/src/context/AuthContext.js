import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role:null
  });

  console.log("auth state==>" , authState)

  useEffect(() => {
    // Check for token in localStorage and update authState
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (token && userId) {
      // Optionally, verify the token and fetch user data
      setAuthState({
        isAuthenticated: true,
        user: { token, userId ,role },
      });
    }
  }, []);

  const login = (user) => {
    const { token, userId, role } = user;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  
    setAuthState({
      isAuthenticated: true,
      user: { token, userId, role },
    });
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
