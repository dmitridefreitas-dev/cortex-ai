import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Phone, UserCheck, TrendingUp, ShieldCheck, Database, CircleGauge, BellRing, Activity } from 'lucide-react';

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
  const [display, setDisplay] = useState('0');

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

const PULSE_PATH = 'M0,36 L20,36 L30,24 L40,48 L50,36 L70,36 L84,20 L96,52 L108,36 L140,36 L154,28 L166,44 L178,36 L220,36 L236,22 L248,50 L260,36 L320,36';

export default function DashboardReveal() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [visibleLogs, setVisibleLogs] = useState(LOG_ENTRIES.slice(0, 3));

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      const next = Math.floor(Math.random() * (LOG_ENTRIES.length - 2));
      setVisibleLogs(LOG_ENTRIES.slice(next, next + 3));
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

  const stats = [
    { label: 'Patients Identified', raw: 4821, icon: UserCheck, accent: '#2563EB', trend: '+12%' },
    { label: 'Calls Automated', raw: 98.4, suffix: '%', icon: Phone, accent: '#3B82F6', trend: 'Peak' },
    { label: 'EMR Entries', raw: 1240, icon: Database, accent: '#1D4ED8', trend: 'Direct' },
  ];

  const operationRows = [
    { label: 'Inbound calls active', value: '18', accent: '#2563EB' },
    { label: 'AI triage queue', value: '04', accent: '#1D4ED8' },
    { label: 'Scheduling confirmations', value: '31', accent: '#475569' },
    { label: 'Escalations', value: '02', accent: '#64748B' },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full flex flex-col bg-background"
    >
      {/* Gradient bridge — fades in over the robot legs above */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(237, 237, 255, 0) 0%, rgba(237, 237, 255, 0.55) 35%, rgba(237, 237, 255, 0.97) 72%, hsl(243 100% 96%) 100%)',
        }}
      />

      {/* Main content */}
      <div className="flex flex-col px-6 md:px-16 pt-10 pb-16 gap-4 relative z-20">

        {/* Section label */}
        <motion.div
          className="text-center mb-1"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">Command Center</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Your practice, on autopilot.
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
            Every call handled, every slot filled, every record updated — in real time.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT: KPI stat cards */}
          <div className="flex flex-row md:flex-col gap-4 md:w-64 shrink-0">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex-1 md:flex-none bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group cursor-default shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.42, ease: 'easeOut' }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at top right, ${stat.accent}0D, transparent 60%)` }}
                />
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 rounded-lg" style={{ background: `${stat.accent}14` }}>
                    <stat.icon size={15} style={{ color: stat.accent }} />
                  </div>
                  <span className="text-[9px] font-black px-2 py-1 rounded-full text-slate-600 bg-slate-50 uppercase tracking-tight border border-slate-200">
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tabular-nums leading-none">
                    <AnimatedCounter target={stat.raw} duration={1.8} />
                    {stat.suffix || ''}
                  </h3>
                </div>
              </motion.div>
            ))}

            {/* Compliance badges */}
            <motion.div
              className="hidden md:flex flex-col gap-3 mt-1"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
            >
              {[
                { icon: ShieldCheck, accent: '#2563EB', label: 'Compliance', value: 'HIPAA Level 4' },
                { icon: TrendingUp, accent: '#2563EB', label: 'Efficiency', value: '+42% Slots Automated' },
              ].map((b, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1 shadow-sm">
                  <div className="flex items-center gap-2">
                    <b.icon size={11} style={{ color: b.accent }} />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{b.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-800 font-black">{b.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Operations panel + live log */}
          <div className="flex-1 flex flex-col gap-5 min-h-0">
            {/* Operations matrix */}
            <motion.div
              className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.48 }}
            >
              {/* Subtle blue glow top-right */}
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05), transparent 70%)' }} />

              <div className="grid grid-cols-12 gap-4 h-full relative z-10">
                <div className="col-span-12 lg:col-span-8 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">Operations Matrix</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Live command layer across clinics</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1">
                      <CircleGauge size={12} className="text-slate-500" />
                      <span className="text-[10px] font-semibold text-slate-500">74ms</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {operationRows.map((row) => (
                      <div key={row.label} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                        <div className="text-[9px] text-slate-400 uppercase tracking-wider">{row.label}</div>
                        <div className="text-2xl font-black mt-1" style={{ color: row.accent }}>{row.value}</div>
                      </div>
                    ))}
                  </div>
                  {/* Pulse rail */}
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Biometric signal rail</div>
                    <svg viewBox="0 0 320 44" className="w-full h-6">
                      <motion.path
                        d={PULSE_PATH}
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.1, opacity: 0.4 }}
                        animate={{ pathLength: [0.1, 1], opacity: [0.4, 1, 0.5] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Command events */}
                <div className="col-span-12 lg:col-span-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <BellRing size={12} className="text-slate-400" />
                    <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold">Command Events</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      'Triage confidence spike detected',
                      'On-call physician ping delivered',
                      'Insurance validation completed',
                      'Patient reminder scheduled',
                    ].map((item, idx) => (
                      <motion.div
                        key={item}
                        className="rounded-lg bg-white border border-slate-200 px-2.5 py-2 text-[10px] text-slate-600 shadow-sm"
                        initial={{ opacity: 0, x: 10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + idx * 0.07 }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live event log */}
            <motion.div
              className="bg-white border border-slate-200 rounded-2xl p-5 overflow-hidden shrink-0 shadow-sm"
              style={{ height: '128px' }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.42 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-blue-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <Activity size={10} className="text-slate-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Practice Events — Live</span>
              </div>
              <div className="flex flex-col gap-1.5 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {visibleLogs.map((log) => (
                    <motion.div
                      key={log.time + log.event}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-[9px] font-mono text-slate-400 shrink-0">{log.time}</span>
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${log.type === 'success' ? 'bg-blue-400' : log.type === 'info' ? 'bg-blue-300' : 'bg-slate-300'}`} />
                      <span className="text-[10px] text-slate-600 font-medium tracking-tight truncate">{log.event}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
