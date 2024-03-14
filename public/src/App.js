import React from 'react';
import './App.css';
import NavPage from './Components/NavPage';
import Administrator from './Components/Administrator';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Customer from './Components/Customer';
import NewStock from './Components/NewStock';
import Footer from './Components/Footer';
import Schedule from './Components/Schedule';
import Deposit from './Components/Depopit';
import Withdraw from './Components/Withdraw';
import History from './Components/History';
import Portfolio from './Components/Portfolio';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Signup from './Components/signup';
import Transactions from './Components/Transaction';

function App() {
  return (
    <Router>
      <NavPage />
      <Routes>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/administrator" element={<ProtectedRoute><Administrator /></ProtectedRoute>} />
        <Route path="/customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
        <Route path="/new-stock" element={<ProtectedRoute><NewStock /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
