import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  // Jab bhi route change hoga, hum login status check karenge
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location]);

  const handleAuth = () => {
    if (isLoggedIn) {
      // 1. Logout logic: LocalStorage saaf karein
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("tempTransport");
      localStorage.removeItem("tempHotel");
      localStorage.removeItem("tempFood");
      
      setIsLoggedIn(false);

      // 2. CRITICAL FIX: navigate ki jagah replace use karein
      // Yeh loop aur blank screen ki problem ko khatam kar dega
      window.location.replace("/"); 
    } else {
      // Login logic
      navigate("/"); 
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b border-stone-100 sticky top-0 z-50">
      {/* Logo */}
      <div 
        className="text-2xl font-serif font-bold text-emerald-800 cursor-pointer flex items-center gap-2"
        onClick={() => navigate(isLoggedIn ? "/home" : "/")}
      >
        Plans 🌎
      </div>
      
      {/* Auth Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleAuth}
          className={`px-8 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-95 ${
            isLoggedIn 
              ? "bg-red-50 text-red-700 border border-red-100 hover:bg-red-100" 
              : "bg-emerald-800 text-white hover:bg-emerald-700"
          }`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;