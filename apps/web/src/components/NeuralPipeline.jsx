import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Brain, Mic, ClipboardList, CalendarCheck, MessageSquare, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    id: 'intake',
    label: '01 — Intake',
    title: 'Call Answered',
    sub: 'Instantly',
    desc: 'Cortex picks up within one ring, 24/7. Callers hear a natural voice — no hold music, no menus.',
    icon: Mic,
    accent: '#2563EB',
    badge: 'Live',
    metric: '< 1s',
    metricLabel: 'pickup',
  },
  {
    id: 'triage',
    label: '02 — Triage',
    title: 'Intent Classified',
    sub: 'Via AI',
    desc: 'Voice models detect urgency, identify the patient via ANI, and route to the right workflow in real time.',
    icon: Brain,
    accent: '#6366F1',
    badge: 'AI',
    metric: '99.2%',
    metricLabel: 'accuracy',
    pulse: true,
  },
  {
    id: 'emr',
    label: '03 — EMR Sync',
    title: 'Record Updated',
    sub: 'Automatically',
    desc: 'Every conversation writes directly to the patient record — no manual transcription, no lag.',
    icon: ClipboardList,
    accent: '#0EA5E9',
    badge: 'Sync',
    metric: '< 2s',
    metricLabel: 'write',
  },
  {
    id: 'schedule',
    label: '04 — Scheduling',
    title: 'Slot Confirmed',
    sub: 'In Real Time',
    desc: 'Cortex checks availability, confirms the appointment, and sends an instant SMS confirmation.',
    icon: CalendarCheck,
    accent: '#10B981',
    badge: 'Done',
    metric: '41%',
    metricLabel: 'no-shows ↓',
  },
  {
    id: 'followup',
    label: '05 — Follow-Up',
    title: 'Reminders Sent',
    sub: 'Multi-channel',
    desc: 'SMS, email, and phone reminders cascade automatically — so every patient shows up prepared.',
    icon: MessageSquare,
    accent: '#8B5CF6',
    badge: 'Auto',
    metric: '3x',
    metricLabel: 'engagement',
  },
  {
    id: 'compliance',
    label: '06 — Compliance',
    title: 'HIPAA Verified',
    sub: 'Every Call',
    desc: 'End-to-end encryption, consent capture, and audit trails baked in — no bolt-ons needed.',
    icon: ShieldCheck,
    accent: '#F59E0B',
    badge: 'Secure',
    metric: '100%',
    metricLabel: 'covered',
  },
];

const CARD_WIDTH = 340;
const CARD_GAP = 24;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

export default function NeuralPipeline() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);
  const posRef = useRef(0);
  const animRef = useRef(null);
  const lastTimestamp = useRef(null);
  const SPEED = 0.5; // px per ms

  // Double the steps for seamless loop
  const DOUBLED = [...STEPS, ...STEPS];
  const TOTAL_WIDTH = STEPS.length * CARD_STRIDE;

  useEffect(() => {
    if (!inView) return;

    const tick = (timestamp) => {
      if (paused) {
        lastTimestamp.current = null;
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      if (lastTimestamp.current !== null) {
        const delta = timestamp - lastTimestamp.current;
        posRef.current = (posRef.current + SPEED * delta) % TOTAL_WIDTH;
        controls.set({ x: -posRef.current });
      }
      lastTimestamp.current = timestamp;
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [inView, paused, controls, TOTAL_WIDTH]);

  return (
    <section ref={sectionRef} className="relative w-full bg-background overflow-hidden py-16">
      {/* Section header */}
      <div className="px-6 md:px-16 mb-10 text-center">
        <motion.p
          className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          The Journey
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          One patient. Four moments.
        </motion.h2>
        <motion.p
          className="text-slate-500 text-sm mt-2 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Every touchpoint, handled — from first ring to follow-up.
        </motion.p>
      </div>

      {/* Connecting dashed line overlay */}
      <div className="absolute left-0 right-0 pointer-events-none"
        style={{ top: 'calc(16px + 10rem + 36px)' }}>
        <div className="border-t border-dashed border-slate-200 mx-6 md:mx-16" />
      </div>

      {/* Carousel track */}
      <div
        className="relative"
        style={{ height: '340px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="absolute top-0 left-0 flex"
          style={{ gap: `${CARD_GAP}px`, paddingLeft: '6vw', paddingRight: '6vw', willChange: 'transform' }}
          animate={controls}
        >
          {DOUBLED.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={`${step.id}-${i}`}
                className="shrink-0 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 group cursor-default"
                style={{ width: `${CARD_WIDTH}px`, height: '300px' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{ background: `${step.accent}14` }}
                    >
                      <Icon size={18} style={{ color: step.accent }} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{step.label}</p>
                      <h3 className="text-base font-black text-slate-900 leading-tight">{step.title}</h3>
                      <p className="text-[10px] text-slate-400">{step.sub}</p>
                    </div>
                  </div>
                  <span
                    className="text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full shrink-0"
                    style={{
                      color: step.accent,
                      background: `${step.accent}14`,
                      border: `1px solid ${step.accent}30`,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Pulse SVG for AI card */}
                {step.pulse && (
                  <svg viewBox="0 0 220 32" className="w-full h-5 mb-2">
                    <motion.path
                      d="M0,16 L30,16 L42,6 L54,26 L66,16 L100,16 L116,4 L128,28 L140,16 L180,16 L194,8 L206,24 L218,16"
                      fill="none"
                      stroke={step.accent}
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </svg>
                )}

                {/* Description */}
                <p className="text-[11px] text-slate-500 leading-relaxed flex-1 mt-1">{step.desc}</p>

                {/* Metric */}
                <div
                  className="mt-3 pt-3 border-t border-slate-100 flex items-end justify-between"
                >
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">{step.metricLabel}</p>
                    <p className="text-2xl font-black leading-none" style={{ color: step.accent }}>{step.metric}</p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: step.accent }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.35 + (i % STEPS.length) * 0.06, duration: 0.6, ease: 'easeOut' }}
                      style={{ originX: 0, background: step.accent }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Hover hint */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400">Hover to pause</p>
      </motion.div>
    </section>
  );
}
