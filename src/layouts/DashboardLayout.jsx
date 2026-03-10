import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  LayoutDashboard,
  Users,
  TrendingUp,
  ShieldAlert,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import Logo from '../components/Logo';
import { demoUser } from '../data/user';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Competitor Analysis', path: '/dashboard/analysis' },
    { icon: TrendingUp, label: 'Market Trends', path: '/dashboard/trends' },
    { icon: ShieldAlert, label: 'Risk & Opportunities', path: '/dashboard/risks' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="md:w-64 bg-white border-r border-gray-100 flex flex-col z-20">
        <div className="p-6">
          <Logo />
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm shadow-blue-100/50' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon className="w-5 h-5 transition-transform" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-x-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {/* Breadcrumbs or Title could go here */}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{demoUser.businessName}</p>
              <p className="text-xs text-gray-500">{demoUser.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors">
              <User className="w-5 h-5" />
              <div className="absolute top-2 right-8 w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold select-none">
                {demoUser.businessName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-8 flex-1 relative overflow-y-auto">
          {/* Subtle background blob */}
          <div className="fixed top-1/2 right-0 w-[30%] h-[30%] bg-blue-100/20 rounded-full blur-[100px] pointer-events-none -z-10" />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
