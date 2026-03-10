import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function Logo({ variant = 'default' }) {
  const isWhite = variant === 'white';
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-lg ${isWhite ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'} flex items-center justify-center shadow-sm`}>
        <BarChart3 className="w-5 h-5" />
      </div>
      <span className={`text-xl font-bold ${isWhite ? 'text-white' : 'text-gray-900'} tracking-tight`}>
        MarketIntel
      </span>
    </div>
  );
}
