import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, UserCheck, Zap, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

function AnimatedCounter({ target, duration = 2, isFloat = false, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(isFloat ? '0.0' : '0');

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numeric;
      setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, isFloat]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const STATS = [
  {
    icon: Phone,
    value: 98.4,
    isFloat: true,
    suffix: '%',
    label: 'Calls Automated',
    context: 'Answered, triaged, and resolved without staff',
    accent: '#2563EB',
  },
  {
    icon: UserCheck,
    value: 4821,
    suffix: '',
    label: 'Patients Handled',
    context: 'Across active clinics in the last 30 days',
    accent: '#3B82F6',
  },
  {
    icon: Zap,
    value: 2,
    prefix: '< ',
    suffix: 's',
    label: 'Average Response',
    context: 'From ring to AI engagement, 24/7',
    accent: '#1D4ED8',
  },
];

const TRUST = [
  { icon: ShieldCheck, label: 'HIPAA Compliant' },
  { icon: CheckCircle, label: 'SOC 2 Certified' },
  { icon: Clock, label: 'Deployed in 48h' },
];

export default function DashboardReveal() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <div ref={sectionRef} className="relative w-full flex flex-col bg-background">
      {/* Gradient bridge — seamlessly blends with Spline hero above */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(237,237,255,0) 0%, rgba(237,237,255,0.55) 35%, rgba(237,237,255,0.97) 72%, hsl(243 100% 96%) 100%)',
        }}
      />

      <div className="relative z-20 max-w-6xl mx-auto w-full px-6 md:px-16 pt-20 pb-20">

        {/* Section label + headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-blue-600 mb-3">Command Center</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Your practice,{' '}
            <span className="text-blue-600">on autopilot.</span>
          </h2>
          <p className="text-slate-400 text-base mt-4 max-w-md mx-auto font-medium">
            Real numbers. Live results. Zero extra headcount.
          </p>
        </motion.div>

        {/* Three big stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${stat.accent}08, transparent 65%)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${stat.accent}12` }}
                >
                  <Icon size={22} style={{ color: stat.accent }} />
                </div>

                {/* Big number */}
                <div className="text-5xl md:text-6xl font-black tabular-nums text-slate-900 leading-none mb-3" style={{ color: stat.accent }}>
                  <AnimatedCounter
                    target={stat.value}
                    isFloat={stat.isFloat}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                    duration={1.8}
                  />
                </div>

                {/* Label */}
                <p className="text-sm font-black text-slate-800 uppercase tracking-widest mb-2">{stat.label}</p>

                {/* Context */}
                <p className="text-[11px] text-slate-400 font-medium leading-snug">{stat.context}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tagline */}
        <motion.p
          className="text-center text-slate-500 text-sm font-medium mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          Every call answered. Every slot filled. Every record updated.
        </motion.p>

        {/* Trust strip */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <Icon size={13} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{t.label}</span>
                {i < TRUST.length - 1 && <span className="ml-6 text-slate-200 text-xs">|</span>}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
