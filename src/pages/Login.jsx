import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    
    if (email && password) {
      // 1. Authentication Status Save Karein
      localStorage.setItem("isLoggedIn", "true");
      
      // 2. Loop aur Throttling se bachne ke liye .replace() ka use karein
      // Yeh history stack se "/" ko hata dega, jisse back button dabaane par loop nahi banega
      setTimeout(() => {
        window.location.replace("/home");
      }, 500); // Thoda sa delay 'smoothness' ke liye
    } else {
      setIsLoading(false);
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md text-center border border-slate-100">
        
        {/* Branding Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-emerald-900 mb-2 flex justify-center items-center gap-2">
            WanderLust <span className="text-3xl">🌎</span>
          </h1>
          <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-slate-500 mt-4 font-medium">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full px-5 py-4 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-5 py-4 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all active:scale-[0.98] ${
              isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200'
            }`}
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <p className="mt-8 text-sm text-slate-400 font-medium">
          New to WanderLust? <span className="text-emerald-600 cursor-pointer hover:underline">Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;