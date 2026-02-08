'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useLayoutEffect, Suspense, useRef } from 'react';

const VaultVisual = dynamic(() => import('@/components/VaultVisual'), { ssr: false });

const BlinkingCursor = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  if (prefersReducedMotion || isMobile) {
    return <span className="inline-block">_</span>;
  }

  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      className="inline-block"
    >
      _
    </motion.span>
  );
};

export default function Home() {
  const [isDelivaDrawerOpen, setIsDelivaDrawerOpen] = useState(false);
  const [showVaultTooltip, setShowVaultTooltip] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const logoRef = useRef<HTMLHeadingElement | null>(null);
  const [logoWidth, setLogoWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    const updateLogoWidth = () => {
      const width = logoRef.current?.getBoundingClientRect().width;
      setLogoWidth(width ? Math.ceil(width) : null);
    };

    const init = async () => {
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // Ignore font readiness errors and measure anyway.
        }
      }
      updateLogoWidth();
    };

    init();

    if (logoRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateLogoWidth());
      resizeObserver.observe(logoRef.current);
    }

    window.addEventListener('resize', updateLogoWidth);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateLogoWidth);
    };
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black touch-none">
      {/* Background Layer - Vector Tower */}
      <div className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-500 ${isDelivaDrawerOpen ? 'opacity-40' : 'opacity-100'}`}>
        <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
          <VaultVisual />
        </Suspense>
      </div>

      {/* Left Vertical Spine (Shared Alignment) */}
      <div className="pl-[10vw]">

        {/* VIBECLABS - Top of Spine */}
        <div className={`fixed top-[2vh] left-[7.5vw] z-20 transition-opacity duration-500 ${isDelivaDrawerOpen ? 'opacity-40' : 'opacity-100'}`}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-left"
          >
            <div className="flex flex-col">
              <h1
                ref={logoRef}
                className="font-mono font-black tracking-tighter text-white uppercase text-[44px] sm:text-[56px] md:text-[72px]"
              >
                VIBECLABS<BlinkingCursor />
              </h1>
              <button
                onClick={() => setIsContactOpen(true)}
                className="mt-[-5px] ml-2 relative left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 px-2 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                style={{ width: logoWidth ? `${Math.ceil(logoWidth)}px` : undefined }}
              >
                Contact
              </button>
            </div>
          </motion.div>
        </div>

        {/* THE VAULT - Middle of Spine */}
        <div className="fixed top-[calc(30vh+120px)] md:top-[30vh] left-[8vw] z-20">
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
              Highly secure data inheritance system. Uses an automated &quot;Dead Man&apos;s Switch&quot; trigger
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

            {/* PROJECT FILES - VAULT (INACTIVE) */}
            <div className="mt-8 relative">
              <div
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white opacity-20 cursor-not-allowed border-b border-white/30 pb-0.5 inline-block"
                onMouseEnter={() => setShowVaultTooltip(true)}
                onMouseLeave={() => setShowVaultTooltip(false)}
              >
                PROJECT FILES
              </div>
              {showVaultTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 mt-2 font-mono text-[8px] text-gray-500 tracking-wider"
                >
                  (ACCESS RESTRICTED)
                </motion.div>
              )}
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

          {/* PROJECT FILES - DELIVA (ACTIVE) */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setIsDelivaDrawerOpen(!isDelivaDrawerOpen)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:text-emerald-400 border-b border-white/30 hover:border-emerald-400/60 pb-0.5 transition-all duration-300 cursor-pointer"
            >
              PROJECT FILES
            </button>
          </div>
        </motion.div>
      </div>

      {/* DELIVA DRAWER - Slide from Right */}
      <AnimatePresence>
        {isDelivaDrawerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
              onClick={() => setIsDelivaDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[40vw] bg-black/80 backdrop-blur-md z-40 border-l border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDelivaDrawerOpen(false)}
                className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              >
                [CLOSE]
              </button>

              {/* Drawer Header */}
              <div className="p-8 border-b border-white/10">
                <h3 className="font-display text-3xl font-black text-white uppercase tracking-tight mb-2">
                  DELIVA
                </h3>
                <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.3em]">
                  PROJECT FILES
                </p>
              </div>

              {/* Scrollable Content Area */}
              <div className="p-8 overflow-y-auto h-[calc(100vh-140px)] space-y-10">

                {/* ECOSYSTEM - Mobile Apps 2x2 Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h4 className="font-mono text-[11px] text-emerald-500/80 uppercase tracking-[0.3em] mb-4">
                    ECOSYSTEM
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Customer App 01 */}
                    <div className="space-y-2">
                      <div className="relative bg-black border border-[#333333] rounded-sm overflow-hidden">
                        <Image
                          src="/projects/deliva_cust_01.webp"
                          alt="Deliva Customer Order Summary"
                          width={388}
                          height={892}
                          priority={true}
                          className="w-full h-auto object-contain"
                          data-spec="vcl-388-892-mob-cust-01"
                        />
                      </div>
                      <p className="font-mono text-[9px] text-gray-500 leading-relaxed">
                        Customer Portal: Order Placement Interface
                      </p>
                    </div>

                    {/* Customer App 02 */}
                    <div className="space-y-2">
                      <div className="relative bg-black border border-[#333333] rounded-sm overflow-hidden">
                        <Image
                          src="/projects/deliva_cust_02.webp"
                          alt="Deliva Order Success State"
                          width={388}
                          height={892}
                          priority={true}
                          className="w-full h-auto object-contain"
                          data-spec="vcl-388-892-mob-cust-02"
                        />
                      </div>
                      <p className="font-mono text-[9px] text-gray-500 leading-relaxed">
                        Customer Portal: Live Tracking Dashboard
                      </p>
                    </div>

                    {/* Courier App 01 */}
                    <div className="space-y-2">
                      <div className="relative bg-black border border-[#333333] rounded-sm overflow-hidden">
                        <Image
                          src="/projects/deliva_cour_01.webp"
                          alt="Deliva Courier Earnings Dashboard"
                          width={388}
                          height={892}
                          className="w-full h-auto object-contain"
                          data-spec="vcl-388-892-mob-cour-01"
                        />
                      </div>
                      <p className="font-mono text-[9px] text-gray-500 leading-relaxed">
                        Courier Interface: Active Delivery Queue
                      </p>
                    </div>

                    {/* Courier App 02 */}
                    <div className="space-y-2">
                      <div className="relative bg-black border border-[#333333] rounded-sm overflow-hidden">
                        <Image
                          src="/projects/deliva_cour_02.webp"
                          alt="Deliva Courier Auth Gateway"
                          width={388}
                          height={892}
                          className="w-full h-auto object-contain"
                          data-spec="vcl-388-892-mob-cour-02"
                        />
                      </div>
                      <p className="font-mono text-[9px] text-gray-500 leading-relaxed">
                        Courier Interface: GPS Route Navigation
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* COMMAND CENTER - Admin Panels Full Width */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h4 className="font-mono text-[11px] text-emerald-500/80 uppercase tracking-[0.3em] mb-4">
                    COMMAND CENTER
                  </h4>

                  {/* Admin Panel 01 */}
                  <div className="space-y-2">
                    <div className="relative bg-black border border-[#333333] rounded-sm overflow-hidden">
                      <Image
                        src="/projects/deliva_adm_01.webp"
                        alt="Deliva Admin KA Localization Modal"
                        width={1917}
                        height={911}
                        className="w-full h-auto object-contain"
                        data-spec="vcl-1917-911-adm-ka-01"
                      />
                    </div>
                    <p className="font-mono text-[9px] text-gray-500 leading-relaxed">
                      Admin Console: Real-Time Operations Dashboard
                    </p>
                  </div>

                  {/* Admin Panel 02 */}
                  <div className="space-y-2">
                    <div className="relative bg-black border border-[#333333] rounded-sm overflow-hidden">
                      <Image
                        src="/projects/deliva_adm_02.webp"
                        alt="Deliva Real-Time Operations Hub"
                        width={1917}
                        height={911}
                        className="w-full h-auto object-contain"
                        data-spec="vcl-1917-911-adm-hub-02"
                      />
                    </div>
                    <p className="font-mono text-[9px] text-gray-500 leading-relaxed">
                      Admin Console: Courier Fleet Management System
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
              onClick={() => setIsContactOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="fixed left-1/2 top-[18vh] z-40 w-[90vw] max-w-[420px] -translate-x-1/2 border border-white/10 bg-[#f5772e] shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between border-b border-white/20 px-5 py-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">
                  Contact Node
                </div>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
                >
                  [CLOSE]
                </button>
              </div>
              <div className="px-5 py-6 space-y-3">
                <div className="font-display text-xl text-white uppercase tracking-tight">
                  Irakli Mosulishvili
                </div>
                <a
                  href="mailto:contact@vibeclabs.com"
                  className="font-mono text-[12px] uppercase tracking-[0.2em] text-white hover:text-white/80 border-b border-white/60 hover:border-white/40 pb-0.5 transition-all duration-300 inline-block"
                >
                  contact@vibeclabs.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
