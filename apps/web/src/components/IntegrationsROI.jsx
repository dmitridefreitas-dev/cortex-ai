import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ShieldCheck, Clock, BarChart3, Zap, CheckCircle } from 'lucide-react';

const EMR_LOGOS = ['Athena', 'Epic', 'eCW', 'Cerner', 'NextGen', 'Allscripts', 'Elation', 'ModMed'];

function SpringCounter({ target, suffix = '', prefix = '', decimal = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(decimal ? '0.0' : '0');

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const start = performance.now();
    const dur = 2200;
    const animate = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const val = eased * numeric;
      setDisplay(decimal ? val.toFixed(1) : Math.round(val).toString());
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, decimal]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const STATS = [
  { label: 'Appointment Accuracy', value: '99.2', suffix: '%', decimal: true, icon: ShieldCheck, color: '#3B82F6', depth: 0, offsetX: 0, offsetY: 0 },
  { label: 'Clinician Hours Saved', value: '14', suffix: 'h', sub: '/week', icon: Clock, color: '#64748B', depth: 12, offsetX: -6, offsetY: 8 },
  { label: 'No-Show Reduction', value: '40', suffix: '%', icon: BarChart3, color: '#10B981', depth: 24, offsetX: 6, offsetY: -4 },
  { label: 'Inbound Automation', value: '100', suffix: '%', sub: '24/7', icon: Zap, color: '#475569', depth: 6, offsetX: -3, offsetY: 16 },
];

// Orbital EMR ring angles
const ANGLE_STEP = 360 / EMR_LOGOS.length;

export default function IntegrationsROI() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Staggered Y parallax for each card
  const y0 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [10, -50]);
  const cardMotions = [y0, y1, y2, y3];

  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orbitRotateSpring = useSpring(orbitRotate, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} className="w-full bg-[#0A0F19] py-24 border-y border-white/5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-slate-400/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Proof
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Real results. Zero overhead.
          </motion.h2>
          <motion.p
            className="text-slate-500 text-sm max-w-xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Measured across 450+ active practices in the first 90 days of deployment.
          </motion.p>
        </div>

        {/* Main content: orbit ring + stat cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* EMR Integration Ring */}
          <div className="flex items-center justify-center">
            <div className="relative w-[340px] h-[340px]">
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-6 rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite]" />

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="flex flex-col items-center gap-2 bg-[#0B1220] border border-white/10 rounded-2xl px-6 py-4 shadow-2xl"
                  animate={{
                    boxShadow: ['0 0 20px rgba(37,99,235,0.15)', '0 0 40px rgba(37,99,235,0.3)', '0 0 20px rgba(37,99,235,0.15)'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <CheckCircle size={22} className="text-green-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Connected</span>
                  <span className="text-[9px] text-slate-600">{EMR_LOGOS.length} EMR systems</span>
                </motion.div>
              </div>

              {/* Orbiting EMR labels */}
              <motion.div
                className="absolute inset-0"
                style={{ rotate: orbitRotateSpring }}
              >
                {EMR_LOGOS.map((name, i) => {
                  const angle = (ANGLE_STEP * i * Math.PI) / 180;
                  const r = 148;
                  const cx = 170 + r * Math.cos(angle);
                  const cy = 170 + r * Math.sin(angle);
                  return (
                    <motion.div
                      key={name}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: cx - 28,
                        top: cy - 14,
                        width: 56,
                        height: 28,
                      }}
                    >
                      <div className="bg-[#0F1929] border border-white/8 rounded-lg px-2 py-1 text-[8px] font-black uppercase tracking-wider text-slate-400 whitespace-nowrap shadow-lg hover:border-slate-300/40 hover:text-slate-200 transition-colors cursor-default">
                        {name}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Floating Stat Cards */}
          <div className="relative grid grid-cols-2 gap-5">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-[#0B1220] border border-white/5 rounded-[1.75rem] p-6 flex flex-col gap-3 relative overflow-hidden group"
                  style={{ y: cardMotions[i] }}
                  whileHover={{
                    borderColor: `${stat.color}40`,
                    boxShadow: `0 0 30px ${stat.color}20`,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Micro-glow */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-[50px] pointer-events-none"
                    style={{ background: `${stat.color}18` }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border"
                      style={{ background: `${stat.color}15`, borderColor: `${stat.color}25` }}
                    >
                      <Icon size={16} style={{ color: stat.color }} />
                    </div>

                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-black text-white tabular-nums tracking-tighter">
                        <SpringCounter
                          target={stat.value}
                          suffix={stat.suffix}
                          decimal={stat.decimal}
                        />
                      </span>
                      {stat.sub && (
                        <span className="text-xs font-bold" style={{ color: stat.color }}>{stat.sub}</span>
                      )}
                    </div>

                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* EMR scrolling marquee — secondary, below grid */}
        <div className="mt-24">
          <p className="text-center text-[9px] font-black uppercase tracking-[0.35em] text-slate-600 mb-8">
            Integrated with the systems you trust
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <motion.div
              className="flex gap-14 items-center whitespace-nowrap"
              animate={{ x: [0, '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              {[...EMR_LOGOS, ...EMR_LOGOS].map((emr, i) => (
                <div key={i} className="flex items-center gap-2 group cursor-default">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400/30 group-hover:bg-blue-400 transition-colors" />
                  <span className="text-lg font-black text-slate-700 group-hover:text-slate-300 transition-colors tracking-tighter uppercase italic select-none">
                    {emr}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
