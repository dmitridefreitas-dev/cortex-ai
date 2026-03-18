import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const FULL_X = '0%';
const OFF_X = '100%';
const FLOAT_DELAY_MS = 2000;

const FloatingCortex = () => {
  const [position, setPosition] = useState('off');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const check = () => setMobileMenuOpen(root.classList.contains('mobile-menu-open'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setPosition('off');
    const timer = setTimeout(() => setPosition('full'), FLOAT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const x = position === 'off' ? OFF_X : FULL_X;

  if (mobileMenuOpen) return null;

  const chatUrl = 'https://cortex-psi-eight.vercel.app/chat';

  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[100]"
      style={{ top: '5.5rem', right: 0 }}
      aria-label="Chat with Cortex - AI receptionist"
    >
      <motion.div
        initial={{ x: OFF_X, opacity: 0 }}
        animate={{ x, opacity: position === 'off' ? 0 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-2.5 rounded-l-full pl-1.5 pr-5 py-1.5 cursor-pointer"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 112, 243, 0.18)',
          borderRight: 'none',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 112, 243, 0.06)',
        }}
        whileHover={{
          boxShadow: '0 6px 32px rgba(0, 112, 243, 0.15), 0 0 0 1px rgba(0, 112, 243, 0.12)',
        }}
      >
        <motion.div
          className="h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 text-white"
          style={{ background: '#0070F3' }}
          animate={{
            boxShadow: [
              '0 0 12px rgba(0, 112, 243, 0.4)',
              '0 0 20px rgba(0, 112, 243, 0.6)',
              '0 0 12px rgba(0, 112, 243, 0.4)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bot className="h-4.5 w-4.5" strokeWidth={2.2} />
        </motion.div>

        <span className="text-[13px] font-semibold leading-tight whitespace-nowrap" style={{ color: '#475569' }}>
          <span className="md:hidden">Chat with Cortex</span>
          <span className="hidden md:inline">Chat with Cortex AI</span>
        </span>
      </motion.div>
    </a>
  );
};

export default FloatingCortex;
