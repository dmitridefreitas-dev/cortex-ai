import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, BrainCircuit, CalendarCheck, FileText } from 'lucide-react';

const STEPS = [
  {
    id: 'call',
    icon: Phone,
    label: 'Step 01',
    title: 'Call Received',
    color: '#2563EB',
    colorSoft: 'rgba(37,99,235,0.12)',
    tags: ['ANI Match', 'Voice ID'],
    content: (
      <div className="mt-5 bg-black/20 rounded-2xl border border-white/5 p-4 font-mono text-[11px] leading-relaxed text-slate-300 space-y-1.5">
        <p><span className="text-blue-400">[AI]</span> Thank you for calling Westside Medical. I'm Cortex.</p>
        <p><span className="text-slate-500">[AI]</span> I see you're calling from a number registered to Maria R. — is that correct?</p>
        <p><span className="text-green-400">[Patient]</span> Yes, that's me.</p>
        <p><span className="text-blue-400">[AI]</span> Great, Maria. How can I help you today?</p>
      </div>
    ),
  },
  {
    id: 'triage',
    icon: BrainCircuit,
    label: 'Step 02',
    title: 'AI Triage',
    color: '#7C3AED',
    colorSoft: 'rgba(124,58,237,0.12)',
    tags: ['LLM-v4', 'Real-time'],
    content: (
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Intent</span>
          <div className="flex gap-2">
            {['APPOINTMENT', 'URGENT'].map((b, i) => (
              <span key={b} className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${i === 0 ? 'bg-blue-600/30 text-blue-300' : 'bg-red-600/30 text-red-300'}`}>{b}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-slate-500">Sentiment</span>
            <span className="text-[10px] font-bold text-slate-300">Positive (0.84)</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '84%' }}
              transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-slate-500">Urgency</span>
            <span className="text-[10px] font-bold text-slate-300">Low (0.21)</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '21%' }}
              transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'schedule',
    icon: CalendarCheck,
    label: 'Step 03',
    title: 'Auto-Schedule',
    color: '#059669',
    colorSoft: 'rgba(5,150,105,0.12)',
    tags: ['Real-Time', 'EHR Sync'],
    content: (
      <div className="mt-5">
        <div className="grid grid-cols-4 gap-1 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu'].map((d) => (
            <div key={d} className="text-[9px] font-bold text-slate-500 uppercase mb-1">{d}</div>
          ))}
          {[null, '9:00', '10:30', null, '11:00', null, '2:00', null, null, '3:30', null, '4:30'].map((slot, i) => (
            <motion.div
              key={i}
              className={`rounded-md py-1.5 text-[9px] font-bold ${slot === '10:30' ? 'bg-green-500 text-white shadow-[0_0_12px_rgba(5,150,105,0.5)]' : slot ? 'bg-white/5 text-slate-400 hover:bg-white/10 cursor-pointer' : 'bg-transparent'}`}
              animate={slot === '10:30' ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {slot || ''}
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] text-green-400 font-bold mt-3">✓ Confirmed — Tue, 10:30 AM with Dr. Chen</p>
      </div>
    ),
  },
  {
    id: 'notify',
    icon: FileText,
    label: 'Step 04',
    title: 'EMR Sync',
    color: '#0EA5E9',
    colorSoft: 'rgba(14,165,233,0.12)',
    tags: ['HL7/FHIR', 'No Manual Entry'],
    content: (
      <div className="mt-5 bg-black/20 border border-white/5 rounded-2xl p-4 space-y-2 font-mono text-[10px]">
        <div className="flex justify-between text-slate-400">
          <span className="text-slate-500">Patient</span>
          <span>Maria Rodriguez — #9281</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="text-slate-500">Appt.</span>
          <span>Tue Mar 25, 10:30 AM</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="text-slate-500">Provider</span>
          <span>Dr. Chen — Cardiology</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="text-slate-500">Intent</span>
          <span className="text-blue-400">APPOINTMENT (0.97)</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-green-400">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Synced to Athena — 0.3s
        </div>
      </div>
    ),
  },
];

export default function NeuralPipeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal translate
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  // Connecting SVG line draw
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '280vh', background: '#050A14' }}>
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center" style={{ background: '#050A14' }}>

        {/* Section header */}
        <div className="text-center pt-6 pb-4 px-6 shrink-0">
          <motion.p
            className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Journey
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-black text-white tracking-tighter"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            One patient. Four moments.
          </motion.h2>
          <motion.p
            className="text-sm text-slate-500 mt-2 max-w-xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Scroll to follow a single call through the Cortex AI pipeline.
          </motion.p>
        </div>

        {/* Horizontal scroll track */}
        <div className="relative flex-1 overflow-hidden px-[10vw]">
          {/* Connecting SVG line */}
          <div className="absolute top-1/2 left-0 w-full h-px pointer-events-none" style={{ transform: 'translateY(-50%)' }}>
            <svg className="w-full h-16" style={{ overflow: 'visible', marginTop: '-32px' }} preserveAspectRatio="none">
              <motion.path
                d="M0,32 Q25%,16 50%,32 Q75%,48 100%,32"
                fill="none"
                stroke="rgba(37,99,235,0.3)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <motion.div
            ref={trackRef}
            className="flex items-center gap-6 h-full"
            style={{ x, width: `${STEPS.length * 90}vw` }}
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="shrink-0 w-[75vw] md:w-[420px] h-auto bg-[#0B1220] border border-white/8 rounded-[2rem] p-8 relative overflow-hidden focus-card-scanlines"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    boxShadow: `0 0 40px ${step.colorSoft}, 0 0 0 1px rgba(255,255,255,0.04)`,
                  }}
                >
                  {/* Glow blob */}
                  <div
                    className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] pointer-events-none"
                    style={{ background: step.colorSoft }}
                  />

                  <div className="relative z-10">
                    {/* Step label */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">{step.label}</span>
                      <div className="flex gap-1.5">
                        {step.tags.map(t => (
                          <span key={t} className="text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-wider bg-white/5 text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Icon + title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="p-2.5 rounded-xl border"
                        style={{ background: step.colorSoft, borderColor: `${step.color}30` }}
                      >
                        <Icon size={20} style={{ color: step.color }} />
                      </div>
                      <h3 className="text-xl font-black text-white tracking-tight">{step.title}</h3>
                    </div>

                    {/* Dynamic content */}
                    {step.content}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll progress indicators */}
        <div className="flex justify-center gap-2 pb-5 shrink-0">
          {STEPS.map((s, i) => (
            <div key={s.id} className="w-6 h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: s.color,
                  scaleX: useTransform(scrollYProgress, [i / STEPS.length, (i + 1) / STEPS.length], [0, 1]),
                  transformOrigin: 'left',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
