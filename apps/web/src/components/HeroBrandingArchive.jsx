import React from 'react';
import { motion } from 'framer-motion';

const CORTEX_BLUE = '#0070F3';

export const HeroBrandingBackup = ({ heroOpacity, heroScale, heroY }) => (
  <motion.div
    className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
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
);
