import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, Brain, ClipboardList, CalendarCheck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Mic,
    title: 'Call Answered',
    desc: 'Cortex picks up within one ring, 24/7. Callers hear a natural voice — no hold music, no menus.',
    metric: '< 1s',
    metricLabel: 'Pickup Time',
    accent: '#2563EB',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Intent Classified',
    desc: 'Voice AI detects urgency, identifies the patient, and routes to the right workflow in real time.',
    metric: '99.2%',
    metricLabel: 'Accuracy',
    accent: '#3B82F6',
  },
  {
    number: '03',
    icon: ClipboardList,
    title: 'Record Updated',
    desc: 'Every conversation writes directly to the patient EMR — no manual transcription, no lag.',
    metric: '< 2s',
    metricLabel: 'EMR Write',
    accent: '#1D4ED8',
  },
  {
    number: '04',
    icon: CalendarCheck,
    title: 'Appointment Confirmed',
    desc: 'Cortex books the slot, sends an SMS confirmation, and schedules automated follow-up reminders.',
    metric: '41%',
    metricLabel: 'Fewer No-Shows',
    accent: '#475569',
  },
];

export default function NeuralPipeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const lineInView = useInView(lineRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="relative w-full bg-background py-24 overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-50/60 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-blue-600 mb-3">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Four steps.{' '}
            <span className="text-blue-600">Fully automated.</span>
          </h2>
          <p className="text-slate-400 text-base mt-4 max-w-md mx-auto font-medium">
            From first ring to confirmed appointment — zero staff involvement.
          </p>
        </motion.div>

        {/* Timeline — desktop horizontal, mobile vertical */}
        <div className="relative">

          {/* Horizontal connector line (desktop only) */}
          <div ref={lineRef} className="hidden md:block absolute top-[2.75rem] left-0 right-0 px-[calc(12.5%)] pointer-events-none z-0">
            <svg className="w-full h-[2px]" viewBox="0 0 900 2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="900" y2="1" stroke="#E2E8F0" strokeWidth="2" />
              <motion.line
                x1="0" y1="1" x2="900" y2="1"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={lineInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </svg>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="flex flex-col items-center md:items-center text-center"
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Circle with number + icon */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div
                      className="w-[5.5rem] h-[5.5rem] rounded-full border-2 flex items-center justify-center bg-white shadow-sm"
                      style={{ borderColor: `${step.accent}30` }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: `${step.accent}10` }}
                      >
                        <Icon size={24} style={{ color: step.accent }} />
                      </div>
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                      style={{ background: step.accent }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-black text-slate-900 mb-2 leading-tight">{step.title}</h3>
                  <p className="text-[12px] text-slate-400 leading-relaxed mb-5 max-w-[220px]">{step.desc}</p>

                  {/* Metric */}
                  <div
                    className="px-4 py-2 rounded-xl border"
                    style={{ background: `${step.accent}07`, borderColor: `${step.accent}20` }}
                  >
                    <p className="text-xl font-black leading-none" style={{ color: step.accent }}>{step.metric}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{step.metricLabel}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
