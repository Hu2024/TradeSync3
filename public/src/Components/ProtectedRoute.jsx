// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/utils'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token || isTokenExpired(token)) {
    // Redirect to login page if there's no token or the token is expired
    return <Navigate to="/login" />;
  }
  
  // Render children if there's a token and it's not expired
  return children;
};

export default ProtectedRoute;
