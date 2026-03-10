import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Branding */}
      <div className="md:w-[45%] bg-[#1c64f2] p-10 flex flex-col justify-center items-center relative overflow-hidden text-white">
        {/* Abstract Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          <div className="mb-8 transform scale-150">
            <Logo variant="white" />
          </div>
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Analyze your market in minutes
          </h1>
          <p className="text-blue-100 text-lg">
            AI-powered competitor analysis and market intelligence for smarter business decisions.
          </p>
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
