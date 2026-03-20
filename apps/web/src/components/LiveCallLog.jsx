import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

const LOG_TEMPLATES = [
  { type: 'INBOUND_CALL', text: 'Patient #{id} → routing...' },
  { type: 'AI_STATUS',    text: 'Scheduling appointment confirmed' },
  { type: 'EMR_SYNC',     text: 'Record updated → Dr. {doc}' },
  { type: 'AI_STATUS',    text: 'Insurance verified for Patient #{id}' },
  { type: 'APPOINTMENT',  text: 'New slot booked: tomorrow at {time}' },
  { type: 'STAGING',      text: 'Voice processing → intent: REFUL_REFILL' },
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
  ]);
  const logIdCounter = useRef(4);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const content = template.text
        .replace('{id}', Math.floor(1000 + Math.random() * 9000).toString())
        .replace('{doc}', DOCTORS[Math.floor(Math.random() * DOCTORS.length)])
        .replace('{time}', TIMES[Math.floor(Math.random() * TIMES.length)]);

      setLogs(prev => [...prev.slice(-14), { 
        id: logIdCounter.current++, 
        time: timeStr, 
        type: template.type, 
        content 
      }]);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'INBOUND_CALL': return '#3b82f6';
      case 'AI_STATUS':    return '#22c55e';
      case 'EMR_SYNC':     return '#a855f7';
      case 'APPOINTMENT':  return '#f59e0b';
      case 'STAGING':      return '#64748b';
      default:             return '#94a3b8';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed bottom-8 left-20 z-[40] hidden md:block" // Positioned above sidebar, visible on desktop
    >
      <div 
        className="w-[340px] rounded-xl overflow-hidden shadow-2xl border border-white/10"
        style={{ 
          background: 'rgba(6, 10, 22, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Terminal Header */}
        <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Call Log Terminal</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={scrollRef}
          className="p-4 h-[180px] overflow-y-auto font-mono text-[11px] leading-relaxed scroll-smooth hide-scrollbar"
        >
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1.5 flex gap-2 whitespace-nowrap"
              >
                <span className="text-slate-500">[{log.time}]</span>
                <span className="font-bold w-[90px]" style={{ color: getTypeColor(log.type) }}>
                  {log.type.padEnd(12)}
                </span>
                <span className="text-slate-300">{log.content}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex items-center gap-1 mt-1">
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1.5 h-3 bg-blue-500/50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveCallLog;
