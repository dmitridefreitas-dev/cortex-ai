import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Clock, BarChart3, Zap, CheckCircle } from 'lucide-react';

const EMR_LOGOS = ['Athena', 'Epic', 'eCW', 'Cerner', 'NextGen', 'Allscripts', 'Elation', 'ModMed'];
const ANGLE_STEP = 360 / EMR_LOGOS.length;

const STATS = [
  {
    icon: ShieldCheck,
    value: '99.2',
    suffix: '%',
    decimal: true,
    label: 'Appointment Accuracy',
    context: 'Measured across 450+ active practices',
    color: '#2563EB',
  },
  {
    icon: Clock,
    value: '14',
    suffix: 'h',
    sub: '/week',
    label: 'Clinician Hours Saved',
    context: 'Per practice, reclaimed from admin work',
    color: '#3B82F6',
  },
  {
    icon: BarChart3,
    value: '40',
    suffix: '%',
    label: 'No-Show Reduction',
    context: 'Via automated multi-channel reminders',
    color: '#1D4ED8',
  },
  {
    icon: Zap,
    value: '100',
    suffix: '%',
    sub: '24/7',
    label: 'Inbound Automation',
    context: 'Every call handled, day or night',
    color: '#475569',
  },
];

function SpringCounter({ target, suffix = '', sub = '', decimal = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(decimal ? '0.0' : '0');

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const start = performance.now();
    const dur = 2000;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const val = eased * numeric;
      setDisplay(decimal ? val.toFixed(1) : Math.round(val).toString());
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimal]);

  return (
    <span ref={ref}>
      {display}{suffix}
      {sub && <span className="text-lg font-bold ml-0.5">{sub}</span>}
    </span>
  );
}

export default function IntegrationsROI() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const orbitRotateSpring = useSpring(orbitRotate, { stiffness: 28, damping: 24, mass: 0.8 });

  return (
    <section ref={sectionRef} className="w-full bg-background py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-50/50 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-blue-600 mb-3">Proven Results</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Real impact.{' '}
            <span className="text-blue-600">Measurable ROI.</span>
          </h2>
          <p className="text-slate-400 text-base mt-4 max-w-md mx-auto font-medium">
            Validated across 450+ active medical practices in the first 90 days.
          </p>
        </motion.div>

        {/* 2x2 Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${stat.color}08, transparent 60%)` }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${stat.color}12` }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>

                {/* Number */}
                <div className="text-5xl font-black tabular-nums tracking-tighter leading-none mb-2" style={{ color: stat.color }}>
                  <SpringCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    sub={stat.sub}
                    decimal={stat.decimal}
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

        {/* EMR Integration strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center gap-12">

              {/* Orbit ring */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="relative w-[280px] h-[280px]">
                  <div className="absolute inset-0 rounded-full border border-slate-100" />
                  <div className="absolute inset-5 rounded-full border border-dashed border-slate-100 animate-[spin_44s_linear_infinite]" />

                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1.5 bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-md">
                      <CheckCircle size={20} className="text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">Connected</span>
                      <span className="text-[9px] text-slate-400">{EMR_LOGOS.length} EMR systems</span>
                    </div>
                  </div>

                  {/* Orbiting labels */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ rotate: orbitRotateSpring, willChange: 'transform' }}
                  >
                    {EMR_LOGOS.map((name, i) => {
                      const angle = (ANGLE_STEP * i * Math.PI) / 180;
                      const r = 122;
                      const cx = 140 + r * Math.cos(angle);
                      const cy = 140 + r * Math.sin(angle);
                      return (
                        <div
                          key={name}
                          className="absolute flex items-center justify-center"
                          style={{ left: cx - 26, top: cy - 12, width: 52, height: 24 }}
                        >
                          <div className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[8px] font-black uppercase tracking-wider text-slate-500 whitespace-nowrap shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                            {name}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>

              {/* Text block */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-3">EMR Integrations</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
                  Works with the systems<br className="hidden lg:block" /> you already use.
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 max-w-sm lg:max-w-none">
                  Cortex integrates directly with Athena, Epic, eClinicalWorks, Cerner, and 4 more — no custom dev required.
                </p>

                {/* Scrolling marquee */}
                <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                  <motion.div
                    className="flex gap-10 items-center whitespace-nowrap"
                    animate={{ x: [0, '-50%'] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  >
                    {[...EMR_LOGOS, ...EMR_LOGOS].map((emr, i) => (
                      <div key={i} className="flex items-center gap-2 cursor-default">
                        <div className="h-1 w-1 rounded-full bg-blue-300" />
                        <span className="text-sm font-black text-slate-500 tracking-tighter uppercase italic select-none">
                          {emr}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
