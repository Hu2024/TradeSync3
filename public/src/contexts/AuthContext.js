// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/utils.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = parseJwt(token);
      setIsAuthenticated(true);
      setCurrentUser(userData.fullName); // Assuming the user's name is in the token
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const userData = parseJwt(token);
    setIsAuthenticated(true);
    setCurrentUser(userData.fullName);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
