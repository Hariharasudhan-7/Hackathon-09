import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertPanel({ isHighRisk }) {
  if (!isHighRisk) return null;

  return (
    <div className="bg-gradient-to-r from-rose-50 to-rose-100/50 border border-rose-200/60 p-5 rounded-2xl shadow-sm mb-6 relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
      <div className="flex items-center">
        <div className="p-2 bg-rose-100 rounded-lg mr-4">
          <AlertTriangle className="h-6 w-6 text-rose-600 animate-pulse" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-900 mb-0.5">High Competition Detected</h4>
          <p className="text-sm font-medium text-rose-700/80">
            Consider adjusting pricing strategy to remain competitive.
          </p>
        </div>
      </div>
    </div>
  );
}
