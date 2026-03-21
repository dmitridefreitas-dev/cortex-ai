import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Activity, Phone, Calendar, UserCheck, TrendingUp, ShieldCheck, Zap, Database } from 'lucide-react';

const LOG_ENTRIES = [
  { time: '14:22:04', event: 'ANI Match: Patient #9281 identified', type: 'info' },
  { time: '14:21:48', event: 'Intent REFILL synced to EMR', type: 'success' },
  { time: '14:21:12', event: 'Voice thread #04 spawned', type: 'system' },
  { time: '14:20:55', event: 'Appt #8812 confirmed — Dr. Chen', type: 'success' },
  { time: '14:20:31', event: 'Outbound reminder sent: Maria R.', type: 'info' },
  { time: '14:20:10', event: 'Insurance verified: BlueCross #4471', type: 'success' },
  { time: '14:19:50', event: 'New call: unknown number triaged', type: 'system' },
];

function AnimatedCounter({ target, duration = 2, prefix = '', suffix = '' }) {
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

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const HEARTBEAT_PATH = "M0,50 L30,50 L45,15 L55,85 L65,50 L80,50 L90,35 L100,65 L110,50 L130,50 L145,20 L155,80 L165,50 L200,50 L210,40 L220,60 L230,50 L280,50 L290,25 L300,75 L310,50 L350,50 L360,30 L370,70 L380,50 L400,50";

export default function DashboardReveal() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [logIndex, setLogIndex] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(LOG_ENTRIES.slice(0, 3));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardZ = useTransform(scrollYProgress, [0, 0.5], [0, 18]);
  const chartZ = useTransform(scrollYProgress, [0, 0.5], [0, -8]);
  const cardY = useTransform(scrollYProgress, [0, 0.4], [20, 0]);

  // Rotate log entries every 3s
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
    { label: 'Patient IDs', value: '4,821', raw: 4821, icon: UserCheck, color: 'text-blue-400', trend: '+12%' },
    { label: 'Calls Automated', value: '98.4%', raw: 98.4, icon: Phone, color: 'text-indigo-400', trend: 'Peak' },
    { label: 'EMR Entries', value: '1,240', raw: 1240, icon: Database, color: 'text-slate-400', trend: 'Direct' },
  ];

  return (
    <div ref={sectionRef} className="relative" style={{ perspective: '1200px' }}>
      {/* Boot scanline overlay */}
      <AnimatePresence>
        {inView && (
          <motion.div
            key="scanline"
            initial={{ opacity: 0.6, y: '-100%' }}
            animate={{ opacity: 0, y: '200%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 pointer-events-none rounded-[2rem] overflow-hidden"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,112,243,0.06) 3px, rgba(0,112,243,0.06) 4px)',
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="w-full h-full bg-[#0B1220] rounded-[1.5rem] overflow-hidden flex flex-col border border-white/5 shadow-2xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Header Bar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-blue-500"
              animate={inView ? { boxShadow: ['0 0 4px rgba(37,99,235,0.4)', '0 0 12px rgba(37,99,235,0.8)', '0 0 4px rgba(37,99,235,0.4)'] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
              Practice Intelligence — Live
            </span>
          </div>
          <div className="flex items-center gap-4">
            <motion.span
              className="text-[10px] font-bold text-green-400 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              Sync Active
            </motion.span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Activity size={14} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">

          {/* Left: Stat Cards with Z-depth */}
          <motion.div
            className="col-span-12 lg:col-span-4 flex flex-col gap-4"
            style={{ translateZ: cardZ, y: cardY }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.06] transition-colors group cursor-default focus-card-scanlines"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon size={16} />
                  </div>
                  <span className="text-[9px] font-black px-2 py-1 rounded-md bg-green-500/10 text-green-400 uppercase tracking-tighter">
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-black text-white tabular-nums">
                    <AnimatedCounter target={stat.raw} duration={1.8} />
                    {stat.label === 'Calls Automated' ? '%' : ''}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Chart + Events */}
          <motion.div
            className="col-span-12 lg:col-span-8 flex flex-col gap-6"
            style={{ translateZ: chartZ }}
          >
            {/* Heartbeat Chart */}
            <motion.div
              className="flex-1 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2rem] p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Neural Activity</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Real-time inference load across all clinics</p>
                </div>
                <div className="flex gap-2">
                  {['24h', '7d', '30d'].map((t, i) => (
                    <button key={t} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Looping heartbeat SVG */}
              <div className="w-full h-28 relative">
                <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="hbGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                    <clipPath id="waveClip">
                      <rect x="0" y="0" width="400" height="100" />
                    </clipPath>
                  </defs>
                  {/* Filled area */}
                  <motion.path
                    d={`${HEARTBEAT_PATH} L400,100 L0,100 Z`}
                    fill="url(#hbGrad)"
                    clipPath="url(#waveClip)"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                  {/* Animated line — scrolls left */}
                  <motion.path
                    d={HEARTBEAT_PATH}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(37,99,235,0.6))' }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: [0, 1], opacity: [0, 1, 1, 0.6] } : {}}
                    transition={{ delay: 0.6, duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
                  />
                </svg>
                {/* Live pulse dot */}
                <motion.div
                  className="absolute top-[22px] right-[48px]"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                </motion.div>
              </div>

              {/* HIPAA + Efficiency badges */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/[0.02] rounded-xl p-3 border border-white/5 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={12} className="text-blue-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Compliance</span>
                  </div>
                  <p className="text-[10px] text-white font-black">HIPAA Level 4 Verified</p>
                </div>
                <div className="bg-white/[0.02] rounded-xl p-3 border border-white/5 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={12} className="text-green-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
                  </div>
                  <p className="text-[10px] text-white font-black">+42% Slots Automated</p>
                </div>
              </div>
            </motion.div>

            {/* Live rotating event log */}
            <motion.div
              className="h-[7.5rem] bg-white/[0.02] border border-white/5 rounded-2xl p-4 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h5 className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3 ml-1">Practice events log</h5>
              <div className="flex flex-col gap-2 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {visibleLogs.map((log, i) => (
                    <motion.div
                      key={log.time + log.event}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors"
                    >
                      <span className="text-[9px] font-mono text-slate-600 shrink-0">{log.time}</span>
                      <div className={`w-1 h-1 rounded-full ${log.type === 'success' ? 'bg-green-500' : log.type === 'info' ? 'bg-blue-500' : 'bg-slate-500'}`} />
                      <span className="text-[10px] text-slate-300 font-medium tracking-tight truncate">{log.event}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
