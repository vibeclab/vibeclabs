'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const events = [
  { year: '2011', label: 'AdSense Infrastructure Initialization' },
  { year: '2021', label: 'ContentGraph Research Phase 1 (YouTube Semantic Mapping)' },
  { year: '2025', label: 'Deliva Logistics Engine Beta Deployment' },
  { year: '2026', label: 'Posthumous Data Vault (Alpha)' },
];

export default function SystemLog() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-emerald-500/50">
        <Terminal size={16} />
        <h3 className="text-[10px] uppercase tracking-[0.3em]">System History</h3>
      </div>

      <div className="flex flex-col gap-4">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            className="flex gap-3 text-sm font-mono"
          >
            <span className="text-accent font-bold">[{event.year}]:</span>
            <span className="text-gray-400">{event.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
