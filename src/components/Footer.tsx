'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-accent/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        {/* CTA Section */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <motion.a
            href="mailto:contact@vicebclabs.com?subject=VibecLabs%20Inquiry%3A%20%5BProject%20Name%5D"
            className="px-8 py-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg text-emerald-500 font-extralight tracking-[0.2em] uppercase text-sm hover:bg-emerald-500/20 hover:border-emerald-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Technical Access
          </motion.a>

          {/* System Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/50 font-mono">All Systems Operational</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-sm font-mono">
            VibecLabs © 2026 // Sagarejo Regional Hub
          </p>
        </div>
      </div>
    </footer>
  );
}
