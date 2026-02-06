'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const VaultVisual = dynamic(() => import('@/components/VaultVisual'), { ssr: false });

const BlinkingCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    className="inline-block"
  >
    _
  </motion.span>
);

export default function Home() {
  return (
    <div className="relative">
      {/* Background Layer - Vector Tower */}
      <div className="fixed inset-0 z-0">
        <VaultVisual />
      </div>

      {/* Hero Layer - Fixed Title */}
      <div className="fixed bottom-12 left-12 z-50 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-[12vw] font-black leading-[0.8] tracking-tighter text-white uppercase"
        >
          VIBECLABS<BlinkingCursor />
        </motion.h1>
      </div>

      {/* Data Nodes - Fixed Corners */}
      <div className="fixed top-12 left-12 z-30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-mono text-[10px] tracking-widest uppercase text-emerald-500 opacity-70"
        >
          PROJECT: THE_VAULT // STATUS: ARCHIVING_LEGACY // SECTOR: POSTHUMOUS_DATA
        </motion.div>
      </div>

      <div className="fixed top-12 right-12 z-30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-mono text-[10px] tracking-widest uppercase text-emerald-500 opacity-70"
        >
          PROJECT: DELIVA_OS // STATUS: ACTIVE_NODE // SECTOR: LOGISTICS_R&D
        </motion.div>
      </div>

      {/* Scrollable Content Layer */}
      <div className="relative z-40">
        {/* Spacer for hero viewport */}
        <div className="h-screen"></div>

        {/* Archive Section */}
        <div className="bg-black">
          <div className="container mx-auto px-12 py-32 max-w-6xl">

            {/* Project 01 - DELIVA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-64"
            >
              <div className="flex gap-16">
                <span className="text-8xl font-light text-white/20">01</span>
                <div className="flex-1 max-w-3xl">
                  <h2 className="text-6xl font-light tracking-tight text-white mb-12 uppercase">
                    DELIVA
                  </h2>
                  <p className="text-xl text-gray-400 leading-relaxed mb-16">
                    A multi-tier orchestration platform for under-served markets. Features real-time GPS
                    courier tracking, automated dispatch logic, and specialized Admin/Customer interfaces.
                  </p>
                  <div className="space-y-4">
                    <div className="font-mono text-[10px] uppercase text-emerald-500/60 tracking-widest">
                      PHASE: LOCAL SANDBOX / MUNICIPAL BETA
                    </div>
                    <div className="flex flex-wrap gap-6">
                      {['Next.js', 'Node.js', 'Socket.io', 'MongoDB'].map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-gray-600 uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 02 - THE VAULT */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-64"
            >
              <div className="flex gap-16">
                <span className="text-8xl font-light text-white/20">02</span>
                <div className="flex-1 max-w-3xl">
                  <h2 className="text-6xl font-light tracking-tight text-white mb-12 uppercase">
                    THE VAULT
                  </h2>
                  <p className="text-xl text-gray-400 leading-relaxed mb-16">
                    Highly secure data inheritance system. Uses an automated "Dead Man's Switch" trigger
                    to release encrypted content to verified recipients based on inactivity protocols.
                  </p>
                  <div className="space-y-4">
                    <div className="font-mono text-[10px] uppercase text-emerald-500/60 tracking-widest">
                      PHASE: PROTOCOL ALPHA
                    </div>
                    <div className="flex flex-wrap gap-6">
                      {['AES-256 Encryption', 'Inactivity Triggers', 'IPFS', 'Secure Auth'].map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-gray-600 uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <Footer />

          </div>
        </div>
      </div>
    </div>
  );
}
