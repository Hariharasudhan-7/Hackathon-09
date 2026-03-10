import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 flex flex-col">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto w-full px-6 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-8">
          <button 
            onClick={() => navigate('/auth')}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Log in
          </button>
          <button 
            onClick={() => navigate('/auth')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between py-12 md:py-24 gap-12">
        <div className="md:w-[45%] space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4" />
            AI-Powered Intelligence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight"
          >
            Market Intelligence <br />
            <span className="text-blue-600">Dashboard</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 leading-relaxed max-w-lg"
          >
            AI-powered competitor analysis for smarter business decisions. Understand your market, track competitors, and seize opportunities.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button 
              onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all hover:-translate-y-1 active:scale-95 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-100 transition-all active:scale-95"
            >
              Log in
            </button>
          </motion.div>
        </div>

        {/* Hero Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-[50%] relative"
        >
          <div className="absolute inset-0 bg-blue-600/10 rounded-[2rem] blur-[80px]" />
          <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] bg-slate-900 aspect-video group">
            <img 
              src="/market_network_graphic.png" 
              alt="Market Intelligence Visualization" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </main>

      {/* Floating Blobs for decoration */}
      <div className="fixed top-[20%] right-[-5%] w-64 h-64 bg-blue-400 opacity-5 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[10%] left-[-5%] w-96 h-96 bg-purple-400 opacity-5 blur-[120px] pointer-events-none" />
    </div>
  );
}
