import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const FULL_X = '0%';
const OFF_X = '100%';

const FLOAT_DELAY_MS = 2000;

const BREATH_DURATION = 4;
const AVATAR_BREATH_SCALE = [1, 1.06, 1];
const BUBBLE_BREATH_SCALE = [1, 1.04, 1];

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
      className="fixed z-[100] flex items-center gap-0"
      style={{ top: '5.5rem', right: 0 }}
      aria-label="Chat with Cortex - AI receptionist"
    >
      <motion.div
        initial={{ x: OFF_X }}
        animate={{ x }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-2 items-end md:flex-row md:items-center"
      >
        <motion.div
          className="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer text-white border-2 border-white/20"
          style={{ backgroundColor: 'var(--cortex-avatar-bg)' }}
          animate={{
            scale: AVATAR_BREATH_SCALE,
            boxShadow: [
              '0 10px 28px var(--cortex-glow)',
              '0 14px 32px var(--cortex-glow-strong)',
              '0 10px 28px var(--cortex-glow)',
            ],
          }}
          transition={{
            duration: BREATH_DURATION,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 16px 36px var(--cortex-glow-strong)',
          }}
        >
          <Bot className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
        </motion.div>

        <motion.div
          className="rounded-2xl px-3 py-2 shadow-lg border border-slate-200/80 bg-white dark:bg-slate-800 dark:border-slate-600/80 w-[7.5rem] md:w-auto max-w-[7.5rem] md:max-w-[220px]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: position === 'off' ? 0 : 1,
            scale: position === 'off' ? 1 : BUBBLE_BREATH_SCALE,
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale:
              position === 'off'
                ? { duration: 0.3 }
                : { duration: BREATH_DURATION, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <p className="text-xs md:text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
            <span className="md:hidden block">Hi, I'm Cortex.</span>
            <span className="md:hidden block">Chat with me!</span>
            <span className="hidden md:inline">Hi, I'm Cortex — your AI receptionist. Chat with me!</span>
          </p>
        </motion.div>
      </motion.div>
    </a>
  );
};

export default FloatingCortex;
