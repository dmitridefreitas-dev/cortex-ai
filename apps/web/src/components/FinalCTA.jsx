import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Lock, Cpu } from 'lucide-react';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'HIPAA Compliant' },
  { icon: Lock, label: 'SOC 2 Certified' },
  { icon: Cpu, label: 'Enterprise Ready' },
];

const PROOF_POINTS = [
  { value: '450+', label: 'Active Practices' },
  { value: '48h', label: 'Deployment Time' },
  { value: '$0', label: 'Setup Cost' },
];

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-[#E8E7FF]"
    >
      {/* Ambient glows */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.05), transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(37,99,235,0.04), transparent 60%)' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-4xl mx-auto w-full"
        style={{ y: contentY }}
      >
        {/* Proof strip — above the headline */}
        <motion.div
          className="flex items-center gap-8 mb-12 flex-wrap justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55 }}
        >
          {PROOF_POINTS.map((p, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900 tracking-tight">{p.value}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{p.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Section label */}
        <motion.p
          className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          System Activation
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.0]">
            Ready to automate<br />
            your{' '}
            <span
              className="text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #6366F1 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              front line?
            </span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed mb-10">
            Deployed in 48 hours. No disruption. No contracts.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.55 }}
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(37,99,235,0.35)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              boxShadow: '0 8px 30px rgba(37,99,235,0.28)',
            }}
          >
            Deploy Cortex AI
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.a>

          <motion.a
            href="/ai-playground"
            whileHover={{ scale: 1.04, borderColor: 'rgba(37,99,235,0.3)', backgroundColor: 'rgba(37,99,235,0.04)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white border border-slate-200 text-slate-700 font-black text-sm uppercase tracking-widest rounded-2xl transition-all whitespace-nowrap shadow-sm"
          >
            <Sparkles size={16} className="text-blue-500" />
            Try AI Sandbox
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {TRUST_BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-center gap-2">
                <Icon size={12} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                  {badge.label}
                </span>
                {i < TRUST_BADGES.length - 1 && (
                  <span className="ml-6 text-slate-300 text-xs">|</span>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
