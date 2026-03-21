import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Lock, Cpu } from 'lucide-react';

const TRUST_BADGES = [
  { label: 'HIPAA Compliant', icon: ShieldCheck },
  { label: 'SOC 2 Certified', icon: Lock },
  { label: 'Enterprise Ready', icon: Cpu },
];

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#040911' }}
    >
      {/* Radial clip-path reveal — wipes the entire screen */}
      <motion.div
        className="absolute inset-0"
        style={{ background: '#040911' }}
        animate={inView ? { clipPath: 'circle(150% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Deep ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 65%)' }}
          animate={inView ? { scale: [0.8, 1.05, 0.95, 1], opacity: [0, 1] } : { opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.08), transparent 60%)' }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(99,37,235,0.06), transparent 60%)' }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)', top: '50%' }}
        animate={inView ? { scaleX: [0, 1], opacity: [0, 0.6, 0] } : { scaleX: 0 }}
        transition={{ delay: 0.3, duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-4xl mx-auto">

        {/* Biometric unlock icon */}
        <motion.div
          className="mb-12 relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Expanding rings */}
          {[1, 1.6, 2.2].map((scale, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-[2rem] border border-blue-500/20"
              animate={inView ? {
                scale: [1, scale],
                opacity: [0.4, 0],
              } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 1.2 + i * 0.4,
              }}
            />
          ))}

          <motion.div
            className="w-20 h-20 rounded-[2rem] flex items-center justify-center relative"
            style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)' }}
            animate={inView ? {
              boxShadow: [
                '0 0 20px rgba(37,99,235,0.2)',
                '0 0 60px rgba(37,99,235,0.5)',
                '0 0 20px rgba(37,99,235,0.2)',
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
              <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
              <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
              <path d="M2 12a10 10 0 0 1 18-6" />
              <path d="M2 17c1 .5 2.5 1.5 5 1.5" />
              <path d="M22 12a10 10 0 0 1-1.93 5.97" />
              <path d="M6 10a6 6 0 0 1 11.07-2.35" />
            </svg>
          </motion.div>

          {/* Unlocked badge */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 1.3, duration: 0.4, type: 'spring', stiffness: 250 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Headline block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6">
            System Activation
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.0]">
            Ready to automate<br />
            your{' '}
            <span
              className="text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              front line?
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Join 450+ medical practices already using Cortex to recover their staff's time and eliminate no-shows — deployed in 48 hours, zero disruption.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(37,99,235,0.6)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              boxShadow: '0 10px 40px rgba(37,99,235,0.4)',
            }}
          >
            Deploy Cortex AI
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.a>

          <motion.a
            href="/ai-playground"
            whileHover={{
              scale: 1.04,
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.2)',
            }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-white/[0.08] text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all whitespace-nowrap"
          >
            <Sparkles size={16} className="text-blue-400" />
            Try AI Sandbox
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 0.45 } : { opacity: 0 }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.6 }}
              >
                <Icon size={12} className="text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                  {badge.label}
                </span>
                {i < TRUST_BADGES.length - 1 && (
                  <span className="ml-6 text-slate-800 text-xs">|</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
