import React, { useState } from 'react';
import { Activity, Building2, Globe, Star, IndianRupee, MapPin, Navigation, UserSearch, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { demoUser } from '../data/user';

const inputBase = "w-full px-4 py-2.5 rounded-xl border bg-white/60 outline-none transition-all duration-300 shadow-sm text-gray-800 placeholder-gray-400";
const inputIndigo = `${inputBase} border-indigo-100 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400`;
const inputRose   = `${inputBase} border-rose-100 focus:bg-white focus:ring-2 focus:ring-rose-400 focus:border-rose-400`;

function FieldLabel({ icon: Icon, label, optional, color = "text-indigo-500" }) {
  return (
    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
      <Icon className={`w-4 h-4 ${color}`} />
      {label}
      {optional && <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>}
    </label>
  );
}

export default function DataForm({ onSubmit, isAnalyzing }) {
  const [formData, setFormData] = useState({
    yourProduct: '',
    yourType: demoUser.businessType,
    yourEmail: '',
    yourUrl: '',
    yourRating: '',
    yourPriceRange: '',
    yourCity: demoUser.city,
    yourLocation: demoUser.locality,
    competitorName: '',
    competitorLocationCity: '',
    competitorUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="glass-panel rounded-2xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Form header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
        <h2 className="text-white font-bold text-lg tracking-tight">Competitor Analysis</h2>
        <p className="text-indigo-100 text-xs mt-0.5">Fill in the details to get your market intelligence report</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">

        {/* ── Your Business ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-black">1</span>
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Your Business</h3>
          </div>

          <div className="bg-indigo-50/50 rounded-2xl p-4 space-y-4 border border-indigo-100/50">

            <div>
              <FieldLabel icon={Building2} label="Your Product / Business Name" />
              <input required type="text" name="yourProduct" value={formData.yourProduct}
                onChange={handleChange} className={inputIndigo} placeholder="e.g. Demo Hotel" />
            </div>

            <div>
              <FieldLabel icon={Building2} label="Type" />
              <input required type="text" name="yourType" value={formData.yourType}
                onChange={handleChange} className={inputIndigo} placeholder="e.g. Hotel, Restaurant, Shop" />
            </div>

            <div>
              <FieldLabel icon={Mail} label="Email" />
              <input required type="email" name="yourEmail" value={formData.yourEmail}
                onChange={handleChange} className={inputIndigo} placeholder="e.g. contact@yourbusiness.com" />
            </div>

            <div>
              <FieldLabel icon={Globe} label="Your Website URL" optional />
              <input type="url" name="yourUrl" value={formData.yourUrl}
                onChange={handleChange} className={inputIndigo} placeholder="https://yourwebsite.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel icon={Star} label="Rating & Reviews" optional />
                <input type="text" name="yourRating" value={formData.yourRating}
                  onChange={handleChange} className={inputIndigo} placeholder="e.g. 4.2★, 150 reviews" />
              </div>
              <div>
                <FieldLabel icon={IndianRupee} label="Price Range" optional />
                <input type="text" name="yourPriceRange" value={formData.yourPriceRange}
                  onChange={handleChange} className={inputIndigo} placeholder="e.g. ₹500 – ₹2000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel icon={MapPin} label="Your City" />
                <input required type="text" name="yourCity" value={formData.yourCity}
                  onChange={handleChange} className={inputIndigo} placeholder="e.g. Coimbatore" />
              </div>
              <div>
                <FieldLabel icon={Navigation} label="Your Location" />
                <input required type="text" name="yourLocation" value={formData.yourLocation}
                  onChange={handleChange} className={inputIndigo} placeholder="e.g. RS Puram" />
              </div>
            </div>

          </div>
        </div>

        {/* ── Competitor ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-black">2</span>
            <h3 className="text-sm font-bold text-rose-500 uppercase tracking-widest">Competitor</h3>
          </div>

          <div className="bg-rose-50/50 rounded-2xl p-4 space-y-4 border border-rose-100/50">

            <div>
              <FieldLabel icon={UserSearch} label="Competitor Name" optional color="text-rose-500" />
              <input type="text" name="competitorName" value={formData.competitorName}
                onChange={handleChange} className={inputRose} placeholder="e.g. Rival Hotel" />
            </div>

            <div>
              <FieldLabel icon={MapPin} label="Competitor Location with City" color="text-rose-500" />
              <input required type="text" name="competitorLocationCity" value={formData.competitorLocationCity}
                onChange={handleChange} className={inputRose} placeholder="e.g. Gandhipuram, Coimbatore" />
            </div>

            <div>
              <FieldLabel icon={Globe} label="Competitor Website URL" optional color="text-rose-500" />
              <input type="url" name="competitorUrl" value={formData.competitorUrl}
                onChange={handleChange} className={inputRose} placeholder="https://competitorwebsite.com" />
            </div>

          </div>
        </div>

        {/* ── Submit ── */}
        <motion.button
          whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
          whileTap={{ scale: isAnalyzing ? 1 : 0.97 }}
          type="submit"
          disabled={isAnalyzing}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-400/30 transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed border border-white/10"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running Deep Analysis...
            </>
          ) : (
            <>
              <Activity className="w-5 h-5" />
              Analyze Market Intelligence
            </>
          )}
        </motion.button>

      </form>
    </motion.div>
  );
}
