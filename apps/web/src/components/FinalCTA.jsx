import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Lock, Cpu } from 'lucide-react';

const TRUST_BADGES = [
  { label: 'HIPAA Compliant', icon: ShieldCheck },
  { label: 'SOC 2 Certified', icon: Lock },
  { label: 'Enterprise Ready', icon: Cpu },
];

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-120px' });

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-6 py-32">
      {/* Outer glow wrapper */}
      <div className="relative">
        <div className="absolute -inset-[1px] rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-transparent to-blue-600/10 pointer-events-none" />

        {/* Main card with radial clip-path reveal */}
        <motion.div
          className="relative bg-[#080F1D] rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,112,243,0.15)]"
          style={{
            clipPath: inView
              ? 'circle(150% at 50% 50%)'
              : 'circle(0% at 50% 50%)',
          }}
          animate={inView ? { clipPath: 'circle(150% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background radial glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.06)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-24 py-20">

            {/* Biometric unlock icon */}
            <motion.div
              className="mb-10 relative"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-[1.75rem] border border-blue-500/30"
                animate={inView ? { scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />
              <motion.div
                className="w-16 h-16 bg-blue-600/15 border border-blue-500/25 rounded-[1.75rem] flex items-center justify-center"
                animate={inView ? {
                  boxShadow: [
                    '0 0 16px rgba(37,99,235,0.2)',
                    '0 0 40px rgba(37,99,235,0.5)',
                    '0 0 16px rgba(37,99,235,0.2)',
                  ],
                } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Fingerprint SVG */}
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                  <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                  <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                  <path d="M2 12a10 10 0 0 1 18-6" />
                  <path d="M2 17c1 .5 2.5 1.5 5 1.5" />
                  <path d="M22 12a10 10 0 0 1-1.93 5.97" />
                  <path d="M6 10a6 6 0 0 1 11.07-2.35" />
                </svg>
              </motion.div>

              {/* Unlocked indicator */}
              <motion.div
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.4, type: 'spring', stiffness: 200 }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-5">System Activation</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.05]">
                Ready to automate<br />
                your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">front&nbsp;line?</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed mb-12">
                Join 450+ medical practices already using Cortex to recover their staff's time and eliminate no-shows — deployed in 48 hours.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.a
                href="/login"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] transition-colors whitespace-nowrap"
              >
                Deploy Cortex AI
                <ArrowRight size={17} strokeWidth={2.5} />
              </motion.a>

              <motion.a
                href="/ai-playground"
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all whitespace-nowrap"
              >
                <Sparkles size={16} className="text-blue-400" />
                Try AI Sandbox
              </motion.a>
            </motion.div>

            {/* Trust badges — staggered fade-in */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
              {TRUST_BADGES.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    className="flex items-center gap-2 opacity-0"
                    animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
                  >
                    <Icon size={12} className="text-slate-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      {badge.label}
                    </span>
                    {i < TRUST_BADGES.length - 1 && (
                      <div className="ml-4 w-px h-4 bg-white/8" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
