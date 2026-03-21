import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot } from 'lucide-react';

const FULL_X = '0%';
const OFF_X = '100%';
const FLOAT_DELAY_MS = 2000;

const FloatingCortex = () => {
  const [position, setPosition] = useState('off');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  const cortexOpacity = useTransform(scrollY, [600, 1000], [1, 0]);
  const cortexPointerEvents = useTransform(scrollY, [600, 1000], ['auto', 'none']);

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

  const chatUrl = 'https://cortexbackend-fz18wxool-defreitasdmitri6-9057s-projects.vercel.app/chat';

  return (
    <motion.a
      href="https://cortexbackend-fz18wxool-defreitasdmitri6-9057s-projects.vercel.app/chat"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[100] flex items-center"
      style={{ top: '6rem', right: '2rem', opacity: cortexOpacity, pointerEvents: cortexPointerEvents }}
      aria-label="Chat with Cortex - AI receptionist"
    >
      {/* Fade-in on mount */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: position === 'off' ? 0 : 1, scale: position === 'off' ? 0.92 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Breathing wrapper — icon + bubble move together */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          animate={{ scale: [1, 1.035, 1], opacity: [1, 0.92, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
        >
          {/* Icon circle */}
          <div
            className="h-[58px] w-[58px] rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: '#2563eb', boxShadow: '0 4px 20px rgba(37, 99, 235, 0.45)' }}
          >
            <motion.div
              animate={{ 
                rotate: [0, -12, 12, -12, 12, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 5.4, // Totals to 6 seconds cycle
                ease: "easeInOut"
              }}
            >
              <Bot className="h-7 w-7" strokeWidth={2} />
            </motion.div>
          </div>

          {/* Chat bubble */}
          <div
            className="bg-[#eff2fc] border border-blue-100/50 shadow-sm px-5 py-3 rounded-[22px] rounded-tl-sm"
            style={{ boxShadow: '0 3px 14px rgba(0,0,0,0.08)' }}
          >
            <p className="text-[14px] font-bold text-[#6B7280] leading-snug">
              Hi, I'm Cortex — your AI
            </p>
            <p className="text-[14px] font-bold text-[#6B7280] leading-snug">
              receptionist. Chat with me!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.a>
  );
};

export default FloatingCortex;
