import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  IndianRupee,
  Activity,
  Users,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

export default function DashboardHome() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Analyses Run', value: '24', detail: '+3 this week', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg. Savings Found', value: '₹1,240', detail: 'Per analysis', icon: IndianRupee, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Risk Score', value: '42%', detail: 'Moderate', icon: Activity, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Competitors Tracked', value: '8', detail: 'Across 3 products', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const quickActions = [
    { 
      label: 'Competitor Analysis', 
      desc: 'Analyze and compare competitor data', 
      path: '/dashboard/analysis', 
      icon: Users,
      color: 'blue'
    },
    { 
      label: 'Market Trends', 
      desc: 'Track pricing and performance trends', 
      path: '/dashboard/trends', 
      icon: TrendingUp,
      color: 'indigo'
    },
    { 
      label: 'Risk & Opportunities', 
      desc: 'Identify threats and growth areas', 
      path: '/dashboard/risks', 
      icon: ShieldAlert,
      color: 'emerald'
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's an overview of your market intelligence.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`p-2.5 rounded-2xl w-fit ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900">{stat.value}</span>
              <span className="text-xs font-bold text-gray-400">{stat.detail}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 ml-1">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(action.path)}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className={`p-4 rounded-2xl w-fit mb-6 shadow-sm group-hover:shadow-md transition-all
                ${action.color === 'blue' ? 'bg-blue-50 text-blue-600' : ''}
                ${action.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : ''}
                ${action.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : ''}
              `}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">{action.label}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{action.desc}</p>
              
              <button className="flex items-center justify-between w-fit gap-6 px-5 py-2.5 bg-gray-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all text-sm font-bold group-hover:shadow-lg group-hover:shadow-blue-200">
                Open
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
