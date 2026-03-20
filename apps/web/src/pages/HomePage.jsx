import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, AlertCircle } from 'lucide-react';

const CORTEX_BLUE = '#0070F3';
const STAFF_DASHBOARD_URL = 'https://cortexbackend-fz18wxool-defreitasdmitri6-9057s-projects.vercel.app/dashboard';
const STAFF_PASSWORD = 'Staff#login';

const StaffModal = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === STAFF_PASSWORD) {
      onClose();
      window.open(STAFF_DASHBOARD_URL, '_blank', 'noopener,noreferrer');
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />

        {/* Card */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={shaking
            ? { scale: [1, 1.02, 0.98, 1.02, 0.98, 1], opacity: 1, y: 0 }
            : { scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ duration: shaking ? 0.4 : 0.26, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            borderRadius: '28px',
            padding: '2rem',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid rgba(37,99,235,0.12)',
            zIndex: 1,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              borderRadius: '50%',
            }}
          >
            <X size={18} />
          </button>

          {/* Icon + Title */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div
              style={{
                height: '52px',
                width: '52px',
                borderRadius: '16px',
                background: CORTEX_BLUE,
                boxShadow: '0 8px 24px rgba(0,112,243,0.32)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginBottom: '1rem',
              }}
            >
              <Lock size={22} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Staff Access</h2>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>Enter your staff password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••••"
              autoFocus
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(37,99,235,0.22)',
                background: '#F8FAFF',
                color: '#1e293b',
                fontSize: '0.9rem',
                fontWeight: 500,
                outline: 'none',
                boxShadow: error ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                boxSizing: 'border-box',
                transition: 'border 0.2s, box-shadow 0.2s',
              }}
            />
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '0.75rem', fontWeight: 500 }}
              >
                <AlertCircle size={13} />
                Incorrect password. Please try again.
              </motion.div>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                background: CORTEX_BLUE,
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,112,243,0.35)',
                letterSpacing: '0.02em',
                marginTop: '4px',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Access Dashboard →
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleStaffClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

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
          href="https://cortexbackend-fz18wxool-defreitasdmitri6-9057s-projects.vercel.app/chat"
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

        <button
          onClick={handleStaffClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
        </button>
      </motion.div>
      
      {/* ── Low-level Vignette Overlay ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-[40]" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 30%, rgba(15, 23, 42, 0.04) 100%)' 
        }}
      />


      {/* ── Staff Password Modal (rendered via portal into document.body) ── */}
      {showModal && <StaffModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default HomePage;
