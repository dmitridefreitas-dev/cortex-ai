import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Activity, Phone, UserCheck, TrendingUp, ShieldCheck, Database } from 'lucide-react';

const LOG_ENTRIES = [
  { time: '14:22:04', event: 'ANI Match: Patient #9281 identified', type: 'info' },
  { time: '14:21:48', event: 'Intent REFILL synced to EMR', type: 'success' },
  { time: '14:21:12', event: 'Voice thread #04 spawned', type: 'system' },
  { time: '14:20:55', event: 'Appt #8812 confirmed — Dr. Chen', type: 'success' },
  { time: '14:20:31', event: 'Outbound reminder sent: Maria R.', type: 'info' },
  { time: '14:20:10', event: 'Insurance verified: BlueCross #4471', type: 'success' },
  { time: '14:19:50', event: 'New call: unknown number triaged', type: 'system' },
];

function AnimatedCounter({ target, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isFloat = String(target).includes('.');
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numeric;
      setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString());
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return <span ref={ref}>{display}</span>;
}

const HEARTBEAT_PATH = "M0,50 L30,50 L45,15 L55,85 L65,50 L80,50 L90,35 L100,65 L110,50 L130,50 L145,20 L155,80 L165,50 L200,50 L210,40 L220,60 L230,50 L280,50 L290,25 L300,75 L310,50 L350,50 L360,30 L370,70 L380,50 L400,50";

export default function DashboardReveal() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [visibleLogs, setVisibleLogs] = useState(LOG_ENTRIES.slice(0, 3));
  const [logIndex, setLogIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardZ = useTransform(scrollYProgress, [0, 0.5], [0, 18]);
  const chartZ = useTransform(scrollYProgress, [0, 0.5], [0, -8]);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setLogIndex(prev => {
        const next = (prev + 1) % (LOG_ENTRIES.length - 2);
        setVisibleLogs(LOG_ENTRIES.slice(next, next + 3));
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

  const stats = [
    { label: 'Patient IDs', raw: 4821, icon: UserCheck, color: 'text-blue-400', trend: '+12%' },
    { label: 'Calls Automated', raw: 98.4, suffix: '%', icon: Phone, color: 'text-indigo-400', trend: 'Peak' },
    { label: 'EMR Entries', raw: 1240, icon: Database, color: 'text-slate-400', trend: 'Direct' },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col"
      style={{ background: '#070D18', perspective: '1200px' }}
    >
      {/* Boot scanline sweep */}
      <AnimatePresence>
        {inView && (
          <motion.div
            key="scanline"
            initial={{ opacity: 0.5, y: '-100%' }}
            animate={{ opacity: 0, y: '200%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,112,243,0.05) 3px, rgba(0,112,243,0.05) 4px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Top status bar */}
      <motion.div
        className="w-full h-12 border-b border-white/[0.04] flex items-center justify-between px-8 md:px-16 shrink-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ background: 'rgba(255,255,255,0.015)' }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-500"
            animate={inView ? { boxShadow: ['0 0 4px rgba(37,99,235,0.4)', '0 0 14px rgba(37,99,235,0.9)', '0 0 4px rgba(37,99,235,0.4)'] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Cortex Practice Intelligence — Live
          </span>
        </div>
        <div className="flex items-center gap-6">
          <motion.span
            className="text-[10px] font-bold text-green-400 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            All Systems Nominal
          </motion.span>
          <div className="flex gap-1.5">
            {['#F59E0B', '#10B981', '#3B82F6'].map((c, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: c }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main content — fills remaining screen height */}
      <div className="flex-1 flex flex-col md:flex-row px-8 md:px-16 py-10 gap-8" style={{ transformStyle: 'preserve-3d' }}>

        {/* LEFT: Stat cards */}
        <motion.div
          className="flex flex-row md:flex-col gap-4 md:w-72 shrink-0"
          style={{ translateZ: cardZ }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex-1 md:flex-none bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group cursor-default"
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.08), transparent 60%)' }}
              />
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon size={15} />
                </div>
                <span className="text-[9px] font-black px-2 py-1 rounded-md bg-green-500/10 text-green-400 uppercase tracking-tight">
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-white tabular-nums leading-none">
                  <AnimatedCounter target={stat.raw} duration={1.8} />
                  {stat.suffix || ''}
                </h3>
              </div>
            </motion.div>
          ))}

          {/* HIPAA + Efficiency badges */}
          <motion.div
            className="hidden md:flex flex-col gap-3 mt-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: ShieldCheck, color: 'text-blue-400', label: 'Compliance', value: 'HIPAA Level 4' },
              { icon: TrendingUp, color: 'text-green-400', label: 'Efficiency', value: '+42% Slots Automated' },
            ].map((b, i) => (
              <div key={i} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05] flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <b.icon size={11} className={b.color} />
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{b.label}</span>
                </div>
                <p className="text-[11px] text-white font-black">{b.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Chart + live log */}
        <motion.div
          className="flex-1 flex flex-col gap-6 min-h-0"
          style={{ translateZ: chartZ }}
        >
          {/* Neural Activity chart panel */}
          <motion.div
            className="flex-1 rounded-3xl p-6 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)' }} />

            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white">Neural Activity</h4>
                <p className="text-[10px] text-slate-600 mt-0.5">Real-time inference load — all clinics</p>
              </div>
              <div className="flex gap-2">
                {['24h', '7d', '30d'].map((t, i) => (
                  <button key={t} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Heartbeat SVG */}
            <div className="w-full relative" style={{ height: 'clamp(80px, 20vh, 160px)' }}>
              <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hbGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={`${HEARTBEAT_PATH} L400,100 L0,100 Z`}
                  fill="url(#hbGrad2)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.5 }}
                />
                <motion.path
                  d={HEARTBEAT_PATH}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(37,99,235,0.7))' }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: [0, 1], opacity: [0, 1, 1, 0.7] } : {}}
                  transition={{ delay: 0.7, duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
                />
              </svg>
              {/* Pulse dot */}
              <motion.div
                className="absolute"
                style={{ top: '18%', right: '12%' }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.9)]" />
              </motion.div>
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '60px 40px',
            }} />
          </motion.div>

          {/* Live event log */}
          <motion.div
            className="rounded-2xl p-5 overflow-hidden shrink-0"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '130px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Activity size={10} className="text-slate-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Practice Events</span>
            </div>
            <div className="flex flex-col gap-1.5 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {visibleLogs.map((log) => (
                  <motion.div
                    key={log.time + log.event}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <span className="text-[9px] font-mono text-slate-700 shrink-0">{log.time}</span>
                    <div className={`w-1 h-1 rounded-full shrink-0 ${log.type === 'success' ? 'bg-green-500' : log.type === 'info' ? 'bg-blue-500' : 'bg-slate-600'}`} />
                    <span className="text-[10px] text-slate-400 font-medium tracking-tight truncate">{log.event}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
