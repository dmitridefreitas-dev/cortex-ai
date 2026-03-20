import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  ]);
  const logIdCounter = useRef(10);

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
      case 'INBOUND_CALL': return '#3b82f6';
      case 'AI_STATUS':    return '#10b981';
      case 'EMR_SYNC':     return '#8b5cf6';
      case 'APPOINTMENT':  return '#f59e0b';
      case 'STAGING':      return '#64748b';
      default:             return '#94a3b8';
    }
  };

  return ReactDOM.createPortal(
    <div 
      className="fixed z-[150] pointer-events-none"
      style={{ bottom: '2rem', right: '2rem', width: '310px' }}
    >
      <div className="flex flex-col items-end gap-2.5">
        <AnimatePresence mode="popLayout" initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="w-full flex flex-col p-3 rounded-2xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderColor: 'rgba(37, 99, 235, 0.1)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: getTypeColor(log.type) }}
                  />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                    {log.type.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-[9px] font-medium text-slate-400 font-mono">
                  {log.time}
                </span>
              </div>
              <p className="text-[11.5px] font-semibold text-slate-700 leading-tight">
                {log.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Live Label */}
      <motion.div 
        className="mt-3 flex items-center justify-end gap-2 opacity-50 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
          Neural Feed Live
        </span>
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Activity size={10} className="text-blue-500" />
        </motion.div>
      </motion.div>
    </div>,
    document.body
  );
};

export default LiveCallLog;
