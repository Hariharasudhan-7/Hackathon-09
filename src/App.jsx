import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardHome from './pages/DashboardHome';
import CompetitorAnalysis from './pages/CompetitorAnalysis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="analysis" element={<CompetitorAnalysis />} />
          
          {/* Placeholder routes for future expansion */}
          <Route path="trends" element={<div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">Market Trends coming soon...</div>} />
          <Route path="risks" element={<div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">Risk & Opportunities coming soon...</div>} />
          <Route path="settings" element={<div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">Settings coming soon...</div>} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
