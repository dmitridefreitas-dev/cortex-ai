import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Activity } from 'lucide-react';

const LOG_TEMPLATES = [
  { type: 'INBOUND_CALL', text: 'Patient #{id} → routing...' },
  { type: 'AI_STATUS',    text: 'Scheduling appointment confirmed' },
  { type: 'EMR_SYNC',     text: 'Record updated → Dr. {doc}' },
  { type: 'AI_STATUS',    text: 'Insurance verified for Patient #{id}' },
  { type: 'APPOINTMENT',  text: 'New slot booked: tomorrow at {time}' },
  { type: 'STAGING',      text: 'Voice processing → intent: REFILL' },
  { type: 'INBOUND_CALL', text: 'Call connected: Clinic Front Desk' },
  { type: 'AI_STATUS',    text: 'Sentiment analyzed: Patient is URGENT' },
  { type: 'EMR_SYNC',     text: 'Syncing vitals to patient chart #{id}' },
];

const DOCTORS = ['Mitch', 'Chen', 'Rodriguez', 'Sarah', 'Kowalski'];
const TIMES = ['9:00 AM', '11:30 AM', '2:15 PM', '4:45 PM'];

const LiveCallLog = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: '12:04:22', type: 'INBOUND_CALL', content: 'Patient #9921 → routing...' },
    { id: 2, time: '12:04:25', type: 'AI_STATUS', content: 'Scheduling appointment confirmed' },
    { id: 3, time: '12:04:31', type: 'EMR_SYNC', content: 'Record updated → Dr. Mitch' },
    { id: 4, time: '12:04:36', type: 'APPOINTMENT', content: 'New slot booked: tomorrow at 11:30 AM' },
  ]);
  const logIdCounter = useRef(11);

  const { scrollY } = useScroll();
  const opacityOut = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleOut = useTransform(scrollY, [0, 400], [1, 0.9]);
  const blurOut = useTransform(scrollY, [0, 400], ['blur(0px)', 'blur(10px)']);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const content = template.text
        .replace('{id}', Math.floor(1000 + Math.random() * 9000).toString())
        .replace('{doc}', DOCTORS[Math.floor(Math.random() * DOCTORS.length)])
        .replace('{time}', TIMES[Math.floor(Math.random() * TIMES.length)]);

      setLogs(prev => {
        const next = [...prev, { 
          id: logIdCounter.current++, 
          time: timeStr, 
          type: template.type, 
          content 
        }];
        return next.slice(-4); 
      });
    }, 4500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case 'INBOUND_CALL': return '#3b82f6'; // Blue
      case 'AI_STATUS':    return '#0F172A'; // Black/Dark Slate
      case 'EMR_SYNC':     return '#64748b'; // Gray
      case 'APPOINTMENT':  return '#3b82f6'; // Blue
      case 'STAGING':      return '#94a3b8'; // Light Gray
      default:             return '#000000'; // Black
    }
  };

  return ReactDOM.createPortal(
    <motion.div 
      className="fixed z-[150] pointer-events-none"
      style={{ 
        bottom: '1rem', right: '2.5rem', width: '300px',
        opacity: opacityOut, 
        scale: scaleOut, 
        filter: blurOut 
      }}
    >
      {/* Live Label */}
      <motion.div 
        className="mb-2 flex items-center justify-end gap-2 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
          Neural Feed <span className="inline-block">Live</span>
        </span>
        <div className="flex items-center self-center -mt-[1px]">
          <svg
            width="30"
            height="12"
            viewBox="0 0 30 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <motion.path
              d="M0 6 L8 6 L11 1.5 L14 10.5 L18 6 L30 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 1.25,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.1, 0.8, 1]
              }}
            />
          </svg>
        </div>
      </motion.div>

      <div 
        className="flex flex-col items-end"
        style={{
          maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
        }}
      >
        <div
          style={{
            background: 'rgba(6, 10, 22, 0.82)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: '1rem',
            boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.4 } }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="w-full flex flex-col px-3 py-2.5"
                style={{
                  borderTop: i > 0 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: getTypeColor(log.type), boxShadow: `0 0 8px ${getTypeColor(log.type)}` }}
                    />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {log.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[9px] font-medium text-slate-500 font-mono">
                    {log.time}
                  </span>
                </div>
                <p className="text-[11.5px] font-semibold text-slate-100 leading-snug">
                  {log.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

export default LiveCallLog;
