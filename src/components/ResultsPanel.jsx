import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  BarChart2,
  Target,
  ShieldAlert,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } }
};

const toArray = (val) => (Array.isArray(val) ? val : val ? [String(val)] : []);

const extractText = (data) => {
  if (!data) return null;
  if (typeof data === 'string') return data;
  const keys = ['output', 'text', 'message', 'content', 'result', 'answer', 'response'];
  for (const k of keys) {
    if (typeof data[k] === 'string') return data[k];
  }
  return null;
};

const isStructured = (data) =>
  data &&
  typeof data === 'object' &&
  ('competitionRiskScore' in data || 'competitorOverview' in data || 'competitorStrengths' in data);

export default function ResultsPanel({ results }) {
  if (!results) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center glass-panel rounded-2xl border border-white/40 p-12 text-center min-h-[400px] shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 mix-blend-overlay" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-400 shadow-inner z-10"
        >
          <Activity className="w-10 h-10" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-700 mb-2 z-10">Results will appear here</h3>
        <p className="text-gray-400 max-w-xs text-sm z-10">
          Fill in your business and competitor details, then click Analyze.
        </p>
      </div>
    );
  }

  // ── Plain-text / unstructured fallback ──
  const plainText = !isStructured(results) ? extractText(results) : null;

  if (plainText || !isStructured(results)) {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-800">
            Market Intelligence Report
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-7 rounded-2xl border border-white/50 shadow-lg">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="p-2 bg-indigo-100 rounded-lg"><BarChart2 className="w-5 h-5 text-indigo-600" /></div>
            <h3 className="text-lg font-bold text-gray-800">Analysis Result</h3>
          </div>
          {plainText ? (
            <p className="text-gray-700 text-[15px] leading-loose whitespace-pre-wrap">{plainText}</p>
          ) : (
            <pre className="text-xs text-gray-600 bg-gray-50 p-4 rounded-xl overflow-auto leading-relaxed">
              {JSON.stringify(results, null, 2)}
            </pre>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // ── Structured response ──
  const riskScore  = Number(results.competitionRiskScore) || 0;
  const strengths  = toArray(results.competitorStrengths);
  const weaknesses = toArray(results.competitorWeaknesses);
  const opps       = toArray(results.businessOpportunities);

  const getRisk = (s) => {
    if (s < 40) return { label: 'Low Risk',      text: 'text-emerald-600', bar: 'from-emerald-400 to-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (s < 70) return { label: 'Moderate Risk', text: 'text-amber-600',   bar: 'from-amber-400 to-amber-500',   badge: 'bg-amber-50 text-amber-700 border-amber-200'   };
    return         { label: 'High Risk',         text: 'text-rose-600',    bar: 'from-rose-400 to-rose-500',     badge: 'bg-rose-50 text-rose-700 border-rose-200'       };
  };

  const risk = getRisk(riskScore);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">

      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-800">
          Market Intelligence Report
        </h2>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${risk.badge}`}>
          {risk.label}
        </span>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {results.averageMarketPrice != null && (
          <motion.div variants={itemVariants} whileHover={{ y: -4, transition: { type: "spring", stiffness: 400 } }}
            className="glass-panel p-5 rounded-2xl border border-white/50 shadow-md flex flex-col gap-3 group relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IndianRupee className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Avg Market Price</span>
            </div>
            <p className="text-3xl font-black text-gray-800 z-10">₹{results.averageMarketPrice}</p>
            {results.priceComparison && (
              <div className="flex items-center">
                {results.priceComparison === 'above' ? (
                  <span className="text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold">
                    <TrendingUp className="w-3.5 h-3.5" /> {results.priceDifference}% above avg
                  </span>
                ) : (
                  <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold">
                    <TrendingDown className="w-3.5 h-3.5" /> {results.priceDifference}% below avg
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Risk Score */}
        <motion.div variants={itemVariants} whileHover={{ y: -4, transition: { type: "spring", stiffness: 400 } }}
          className={`glass-panel p-5 rounded-2xl border border-white/50 shadow-md flex flex-col gap-3 ${results.averageMarketPrice != null ? 'md:col-span-2' : 'md:col-span-3'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ShieldAlert className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Competition Risk Score</span>
            </div>
            <span className={`font-black text-2xl ${risk.text}`}>{riskScore}<span className="text-base font-semibold text-gray-400">/100</span></span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
              className={`h-full rounded-full bg-gradient-to-r ${risk.bar} shadow-sm`}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <span>Low</span><span>Moderate</span><span>High</span>
          </div>
        </motion.div>
      </div>

      {/* Competitor Overview */}
      {results.competitorOverview && (
        <motion.div variants={itemVariants}
          className="glass-panel p-6 rounded-2xl border border-white/50 shadow-md">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
            <div className="p-2 bg-purple-100 rounded-lg"><BarChart2 className="w-4 h-4 text-purple-600" /></div>
            <h3 className="font-bold text-gray-800">Competitor Landscape</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{results.competitorOverview}</p>
        </motion.div>
      )}

      {/* Strengths & Weaknesses + Trends & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="space-y-5">
          {strengths.length > 0 && (
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}
              className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-400 border border-white/50 shadow-md">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-emerald-500" /> Competitor Strengths
              </h4>
              <ul className="space-y-2.5">
                {strengths.map((str, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {weaknesses.length > 0 && (
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}
              className="glass-panel p-5 rounded-2xl border-l-4 border-l-rose-400 border border-white/50 shadow-md">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-rose-500" /> Competitor Weaknesses
              </h4>
              <ul className="space-y-2.5">
                {weaknesses.map((weak, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{weak}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        <div className="space-y-5">
          {(results.marketTrends || results.marketRiskAnalysis) && (
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}
              className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-400 border border-white/50 shadow-md">
              {results.marketTrends && (
                <>
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">Market Trends</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 pb-4 border-b border-gray-100">{results.marketTrends}</p>
                </>
              )}
              {results.marketRiskAnalysis && (
                <>
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">Market Risk Analysis</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{results.marketRiskAnalysis}</p>
                </>
              )}
            </motion.div>
          )}

          {opps.length > 0 && (
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 shadow-md">
              <h4 className="font-bold text-indigo-900 mb-3 text-sm">Strategic Opportunities</h4>
              <ul className="space-y-2.5">
                {opps.map((opp, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    className="flex items-start gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/70 text-sm text-indigo-800 font-medium"
                  >
                    <span className="text-indigo-500 shrink-0 font-black">→</span>
                    <span>{opp}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>

    </motion.div>
  );
}
