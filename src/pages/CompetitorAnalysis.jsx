import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataForm from '../components/DataForm';
import ResultsPanel from '../components/ResultsPanel';
import AlertPanel from '../components/AlertPanel';

// Switch to /webhook/scout when workflow is Activated for production
const N8N_WEBHOOK_URL = 'https://n8nworks07.app.n8n.cloud/webhook-test/scout';

export default function CompetitorAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (formData) => {
    setIsAnalyzing(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const raw = await response.json();
      // n8n often wraps the response in an array — unwrap it
      const data = Array.isArray(raw) ? raw[0] : raw;
      console.log('n8n response:', data);
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to the analysis service.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isHighRisk = results?.competitionRiskScore > 70;

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {results && isHighRisk && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <AlertPanel isHighRisk={isHighRisk} />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm"
        >
          <strong>Error:</strong> {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-4"
        >
          <DataForm onSubmit={handleAnalyze} isAnalyzing={isAnalyzing} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-8"
        >
          <ResultsPanel results={results} isAnalyzing={isAnalyzing} />
        </motion.div>
      </div>
    </div>
  );
}
