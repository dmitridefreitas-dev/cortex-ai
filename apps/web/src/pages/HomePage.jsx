import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Lock, X, AlertCircle } from 'lucide-react';
import LiveCallLog from '../components/LiveCallLog.jsx';
import PortalButtons from '../components/PortalButtons.jsx';
import DashboardReveal from '../components/DashboardReveal';
import NeuralPipeline from '../components/NeuralPipeline';
import IntegrationsROI from '../components/IntegrationsROI';
import FinalCTA from '../components/FinalCTA';


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

  // ── Scroll Tracking for Hero Transitions ──
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [600, 1000], [1, 0]);
  const heroScale = useTransform(scrollY, [600, 1000], [1, 0.85]);
  const heroY = useTransform(scrollY, [600, 1000], [0, -40]);

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

      {/* ── Scrollable Homepage Wrapping Container ── */}
      <div className="relative w-full">
        
        {/* ── Sticky Hero Wrapper ── */}
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-[50]">
          <motion.div 
            className="w-full h-full relative"
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          >


            <PortalButtons onStaffClick={handleStaffClick} />
            
            {/* ── Low-level Vignette Overlay ── */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ 
                background: 'radial-gradient(circle at center, transparent 35%, rgba(0, 0, 0, 0.28) 100%)' 
              }}
            />
          </motion.div>
        </div>

        {/* ── Spacer for Scroll Fade ── */}
        <div style={{ height: '20vh' }} className="pointer-events-none w-full" />

        {/* ── Dashboard Section (Fullscreen) ── */}
        <div className="relative w-full z-[100] pointer-events-auto">
          <DashboardReveal />
        </div>

        {/* ── Neural Pipeline Section ── */}
        <NeuralPipeline />

        {/* ── Integrations & ROI ── */}
        <IntegrationsROI />

        {/* ── Final CTA ── */}
        <FinalCTA />

      </div>

      {/* ── Staff Password Modal ── */}
      {showModal && <StaffModal onClose={() => setShowModal(false)} />}

      <LiveCallLog />
    </>
  );
};

export default HomePage;
