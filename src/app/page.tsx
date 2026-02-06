'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

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
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black touch-none">
      {/* Background Layer - Vector Tower */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <VaultVisual />
      </div>

      {/* Left Vertical Spine (Shared Alignment) */}
      <div className="pl-[10vw]">

        {/* VIBECLABS - Top of Spine */}
        <div className="fixed top-[2vh] left-[7.5vw] z-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-left"
          >
            <h1 className="font-mono font-black tracking-tighter text-white uppercase" style={{ fontSize: '4.5rem' }}>
              VIBECLABS<BlinkingCursor />
            </h1>
          </motion.div>
        </div>

        {/* THE VAULT - Middle of Spine */}
        <div className="fixed top-[30vh] left-[8vw] z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-left max-w-[22vw]"
          >
            <h2 className="font-display text-5xl font-black tracking-tight text-white mb-6 uppercase">
              THE VAULT
            </h2>
            <p className="font-mono text-[13px] text-gray-400 tracking-tight leading-relaxed opacity-70 font-medium mb-6">
              Highly secure data inheritance system. Uses an automated "Dead Man's Switch" trigger
              to release encrypted content to verified recipients based on inactivity protocols.
            </p>
            <div className="space-y-2">
              <div className="font-mono text-[9px] uppercase text-emerald-500 tracking-[0.3em] opacity-50">
                PHASE: PROTOCOL ALPHA
              </div>
              <div className="flex flex-wrap gap-2">
                {['AES-256', 'IPFS', 'Secure Auth'].map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em] opacity-50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Right Wing: DELIVA (Lower Position) */}
      <div className="fixed top-[60vh] right-[8vw] z-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-right max-w-[22vw]"
        >
          <h2 className="font-display text-5xl font-black tracking-tight text-white mb-6 uppercase">
            DELIVA
          </h2>
          <p className="font-mono text-[13px] text-gray-400 tracking-tight leading-relaxed opacity-70 font-medium text-right mb-6">
            A multi-tier orchestration platform for under-served markets. Features real-time GPS
            courier tracking, automated dispatch logic, and specialized Admin/Customer interfaces.
          </p>
          <div className="space-y-2 flex flex-col items-end">
            <div className="font-mono text-[9px] uppercase text-emerald-500 tracking-[0.3em] opacity-50">
              PHASE: MUNICIPAL BETA
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              {['Next.js', 'Node.js', 'Socket.io'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em] opacity-50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
