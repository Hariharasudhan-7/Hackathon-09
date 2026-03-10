import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would authenticate here
    navigate('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p className="text-gray-500">
          Start analyzing your market in minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] mt-4"
        >
          Create account
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm">
        Already have an account? <button onClick={() => navigate('/auth')} className="text-blue-600 font-bold hover:underline">Log in</button>
      </p>
    </div>
  );
}
