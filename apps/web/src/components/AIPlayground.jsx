
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Phone, Calendar, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AIPlayground = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Cortex. I handle front-desk operations for Meridian Medical. How can I help you today?", icon: Sparkles }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const scenarios = [
    { label: 'Book Appointment', text: 'I need to see a doctor for a checkup next Tuesday.' },
    { label: 'Insurance Inquiry', text: 'Do you accept BlueCross BlueShield?' },
    { label: 'Reschedule', text: 'Can I move my 3pm today to tomorrow morning?' },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Logic
    setTimeout(() => {
      let response = "I'm processing that for you. One moment...";
      let icon = Bot;

      if (userMessage.toLowerCase().includes('tuesday') || userMessage.toLowerCase().includes('book')) {
        response = "I have an opening at 10:00 AM and 2:30 PM next Tuesday with Dr. Mitchell. Which one works best for you?";
        icon = Calendar;
      } else if (userMessage.toLowerCase().includes('insurance') || userMessage.toLowerCase().includes('accept')) {
        response = "Yes, Meridian Medical is in-network with BlueCross BlueShield. I can also verify your specific coverage if you provide your member ID.";
        icon = Info;
      } else if (userMessage.toLowerCase().includes('reschedule') || userMessage.toLowerCase().includes('move')) {
        response = "I've found your 3:00 PM appointment today. I can move it to 9:15 AM tomorrow. Should I go ahead and update that in our system?";
        icon = RefreshCw;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response, icon }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">AI Sandbox</h2>
        <p className="text-text-secondary">Interact with a live demo of Cortex Voice AI logic.</p>
      </div>

      <Card className="border-none shadow-2xl bg-surface-elevated overflow-hidden rounded-3xl">
        {/* Header */}
        <div className="bg-brand-primary p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Bot size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Cortex Voice AI</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Active Session</span>
              </div>
            </div>
          </div>
          <Phone size={18} className="opacity-60" />
        </div>

        {/* Chat Area */}
        <CardContent className="p-0">
          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-6 space-y-4 bg-muted/30"
          >
            {messages.map((m, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    m.role === 'user' ? 'bg-brand-secondary text-white' : 'bg-brand-primary text-white shadow-glow-primary'
                  }`}>
                    {m.role === 'user' ? <User size={14} /> : <m.icon size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-primary text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-text-primary shadow-sm rounded-tl-none border border-border/50'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-border/50 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="p-4 border-t border-border bg-white dark:bg-slate-900/50">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3 ml-1">Quick Scenarios</p>
            <div className="flex flex-wrap gap-2">
              {scenarios.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSend(s.text)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:border-brand-primary hover:text-brand-primary transition-all active:scale-95"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-4 flex gap-2 bg-white dark:bg-slate-900"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message to Cortex..."
              className="flex-grow bg-muted/50 border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20"
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPlayground;
