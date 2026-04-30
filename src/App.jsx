import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import TransportPage from './pages/TransportPage';
import Hotels from './pages/Hotels';
import Food from './pages/Food';

function App() {
  // Authentication check helper
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          {/* 1. Login Page: Agar already logged in hai toh home bhej do */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} 
          />
          
          {/* 2. Home Page: Direct access allow karein, Home.jsx khud internal check handle karega */}
          <Route path="/home" element={<Home />} />
          
          {/* 3. Other Pages: Inhe bhi direct rakhein loop se bachne ke liye */}
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/food" element={<Food />} />

          {/* 4. Catch-all: Redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;