import React from 'react';
import ReactDOM from 'react-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const CORTEX_BLUE = '#0070F3';

const PortalButtons = ({ onStaffClick }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const pointerEvents = useTransform(scrollY, [190, 200], ['auto', 'none']);

  return ReactDOM.createPortal(
    <motion.div
      className="fixed bottom-12 left-6 z-[9999] flex flex-col items-start gap-3.5"
      style={{ opacity, pointerEvents }}
    >
      <div className="flex flex-col gap-1 mb-1">
        <p
          className="text-[12px] font-black tracking-[0.22em] uppercase"
          style={{ color: '#64748B', letterSpacing: '0.22em' }}
        >
          CHOOSE PORTAL
        </p>
        <div className="h-[2px] w-8 rounded-full bg-blue-500/30" />
      </div>

      <a
        href="https://cortexbackend-fz18wxool-defreitasdmitri6-9057s-projects.vercel.app/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-white text-[13px] font-bold tracking-wide transition-all hover:scale-105 hover:shadow-xl active:scale-95"
        style={{
          background: CORTEX_BLUE,
          boxShadow: `0 6px 24px rgba(0,112,243,0.38)`,
          fontFamily: '"Inter Tight", sans-serif',
          minWidth: '180px',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Patient Portal
      </a>

      <button
        onClick={onStaffClick}
        className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          color: CORTEX_BLUE,
          border: `1.5px solid ${CORTEX_BLUE}40`,
          background: `rgba(0,112,243,0.04)`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          fontFamily: '"Inter Tight", sans-serif',
          minWidth: '180px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        Staff Dashboard
      </button>
    </motion.div>,
    document.body
  );
};

export default PortalButtons;
