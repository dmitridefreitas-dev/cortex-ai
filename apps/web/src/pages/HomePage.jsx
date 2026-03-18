import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const CORTEX_BLUE = '#0070F3';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Cortex — The AI that runs your front line</title>
        <meta
          name="description"
          content="Cortex AI handles your front desk 24/7 — answering calls, booking appointments, and integrating with your EMR."
        />
      </Helmet>

      {/* ── Top-center branding ── */}
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center pointer-events-none"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-2.5 mb-1.5">
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-black"
            style={{
              background: CORTEX_BLUE,
              boxShadow: `0 0 16px rgba(0,112,243,0.45)`,
            }}
          >
            C
          </div>
          <span
            className="text-xl font-black tracking-[0.18em] uppercase"
            style={{
              color: CORTEX_BLUE,
              fontFamily: '"Inter Tight", "Montserrat", sans-serif',
              textShadow: `0 0 12px rgba(0,112,243,0.35)`,
            }}
          >
            CORTEX
          </span>
        </div>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: '#64748B', letterSpacing: '0.15em' }}
        >
          The AI that runs your front line
        </p>
      </motion.div>

      {/* ── Bottom-right: Choose Portal pill ── */}
      <motion.div
        className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
      >
        <p
          className="text-[10px] font-semibold tracking-widest uppercase mb-1"
          style={{ color: '#94A3B8', letterSpacing: '0.14em' }}
        >
          Choose Portal
        </p>

        <a
          href="https://cortex-psi-eight.vercel.app/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold tracking-wide transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          style={{
            background: CORTEX_BLUE,
            boxShadow: `0 4px 20px rgba(0,112,243,0.35)`,
            fontFamily: '"Inter Tight", sans-serif',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Patient Portal
        </a>

        <a
          href="https://cortex-psi-eight.vercel.app/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all hover:scale-105 active:scale-95"
          style={{
            color: CORTEX_BLUE,
            border: `1px solid ${CORTEX_BLUE}50`,
            background: `${CORTEX_BLUE}0D`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            fontFamily: '"Inter Tight", sans-serif',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Staff Dashboard
        </a>
      </motion.div>
    </>
  );
};

export default HomePage;
