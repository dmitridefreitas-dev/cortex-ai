
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, MessageSquare, LayoutGrid, Users, LineChart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesPage = () => {
  const versions = [
    {
      version: 'V1',
      title: 'Basic Booking & Reminders',
      icon: Stethoscope,
      features: [
        { text: 'Automated phone answering (24/7)', emoji: '📞', active: true },
        { text: 'Appointment booking via voice', emoji: '🎙️', active: true },
        { text: 'SMS appointment reminders', emoji: '💬', active: false },
        { text: 'Basic calendar integration', emoji: '📅', active: false },
        { text: 'Simple patient database', emoji: '🧑‍⚕️', active: false },
        { text: 'Call recording and transcription', emoji: '📝', active: false },
      ],
      available: true
    },
    {
      version: 'V2',
      title: 'Two-Way Comm + Basic EMR',
      icon: MessageSquare,
      features: [
        { text: 'All V1 features', emoji: '⚙️', active: false },
        { text: 'Email integration (Gmail, Outlook)', emoji: '📧', active: true },
        { text: 'Basic EMR sync (read/write)', emoji: '🩺', active: true },
        { text: 'Patient portal access', emoji: '🪪', active: false },
        { text: 'Automated follow-up emails', emoji: '📨', active: false },
        { text: 'Multi-language support', emoji: '🌐', active: false },
      ],
      available: true
    },
    {
      version: 'V3',
      title: 'Smart Schedule + Auto-Pay',
      icon: LayoutGrid,
      features: [
        { text: 'All V2 features', emoji: '⚙️', active: false },
        { text: 'No-show prediction and prevention', emoji: '📉', active: true },
        { text: 'Smart scheduling optimization', emoji: '🗓️', active: true },
        { text: 'Payment processing integration', emoji: '💳', active: false },
        { text: 'Automated billing reminders', emoji: '🔔', active: false },
        { text: 'Insurance verification', emoji: '✅', active: false },
      ],
      available: true
    },
    {
      version: 'V4',
      title: 'Full Patient Hub',
      icon: Users,
      features: [
        { text: 'All V3 features', emoji: '⚙️', active: false },
        { text: 'Multi-channel communication', emoji: '📡', active: true },
        { text: 'Advanced EMR integration (CRUD)', emoji: '🧠', active: true },
        { text: 'Patient engagement campaigns', emoji: '📣', active: false },
        { text: 'Telehealth integration', emoji: '📹', active: false },
        { text: 'Custom workflows', emoji: '🧩', active: false },
      ],
      available: false
    },
    {
      version: 'V5',
      title: 'Predictive Analytics',
      icon: LineChart,
      features: [
        { text: 'All V4 features', emoji: '⚙️', active: false },
        { text: 'Predictive patient analytics', emoji: '📊', active: true },
        { text: 'Revenue optimization', emoji: '💹', active: true },
        { text: 'Staff scheduling optimization', emoji: '👩‍⚕️', active: false },
        { text: 'Patient lifetime value tracking', emoji: '♾️', active: false },
        { text: 'Churn prediction', emoji: '🔮', active: false },
      ],
      available: false
    },
    {
      version: 'V6',
      title: 'Full Autonomy',
      icon: Sparkles,
      features: [
        { text: 'All V5 features', emoji: '⚙️', active: false },
        { text: 'Fully autonomous management', emoji: '🤖', active: true },
        { text: 'Provider-facing AI assistant', emoji: '🧑‍⚕️🤖', active: true },
        { text: 'Clinical decision support', emoji: '📈', active: false },
        { text: 'Automated quality assurance', emoji: '🧪', active: false },
        { text: 'Continuous learning', emoji: '🔁', active: false },
      ],
      available: false
    },
  ];

  return (
    <>
      <Helmet>
        <title>Features - Cortex AI</title>
        <meta name="description" content="Explore Cortex AI features across all versions, from basic booking to full practice autonomy." />
      </Helmet>

      <div className="relative min-h-screen flex flex-col">
        {/* background is global (App.jsx) */}
        
        <div className="relative pt-20 pb-24 px-4 flex-grow flex flex-col justify-center">
          <div className="container max-w-6xl mx-auto w-full">
            <div className="text-center mb-12 z-20 relative">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slateText mb-4 tracking-wide"
              >
                Built for the front line
              </h1>
              <div className="flex justify-center mb-6">
                <motion.svg
                  className="w-28 h-6"
                  viewBox="0 0 120 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="12"
                    x2="120"
                    y2="12"
                    stroke="rgba(148,163,184,0.6)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M0 12 L10 12 L18 4 L26 18 L34 6 L42 16 L50 12 L60 12"
                    stroke="var(--primary-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0, x: -60 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.8, 0], x: 120 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      filter: 'drop-shadow(0 0 10px var(--cortex-glow))',
                    }}
                  />
                </motion.svg>
              </div>
              <p className="text-base text-slateMuted max-w-2xl mx-auto font-light leading-relaxed">
                Choose the version that fits your practice. Upgrade anytime as you grow.
              </p>
            </div>

            <div className="relative">
              {/* Desktop Progression Lines SVG (3 columns, 2 rows) */}
              <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="desktop-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 16.6 25 L 50 25 L 83.3 25 L 16.6 75 L 50 75 L 83.3 75" 
                  fill="none" 
                  stroke="url(#desktop-line-grad)" 
                  strokeWidth="0.3" 
                  className="progression-line"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Tablet Progression Lines SVG (2 columns, 3 rows) */}
              <svg className="hidden md:block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="tablet-feat-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 25 16.6 L 75 16.6 L 25 50 L 75 50 L 25 83.3 L 75 83.3" 
                  fill="none" 
                  stroke="url(#tablet-feat-line-grad)" 
                  strokeWidth="0.5" 
                  className="progression-line"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Mobile Progression Lines SVG (1 column, 6 rows) */}
              <svg className="block md:hidden absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="mobile-feat-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 50 8.3 L 50 91.6" 
                  fill="none" 
                  stroke="url(#mobile-feat-line-grad)" 
                  strokeWidth="0.5" 
                  className="progression-line"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 relative z-10">
                {versions.map((version, vIndex) => {
                  const Icon = version.icon;
                  return (
                  <Card key={vIndex} className="bg-white dark:bg-card/95 border-border hover:border-primary hover:shadow-glow-soft transition-all duration-300 hover:-translate-y-1 rounded-2xl flex flex-col h-full">
                    <CardHeader className="pb-2 pt-4 px-4 lg:px-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-primary dark:text-white mb-2">
                            {version.version}
                          </span>
                          <CardTitle className="mt-0.5 text-sm text-slateText dark:text-white leading-tight font-semibold">
                            {version.title}
                          </CardTitle>
                        </div>
                        {Icon && (
                          <div className="h-9 w-9 rounded-full bg-primaryBlueSoft dark:bg-white/5 flex items-center justify-center shadow-sm shrink-0">
                            <Icon className="h-4 w-4 text-primary dark:text-white" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 lg:px-5 pb-4 flex-grow flex flex-col">
                      <div className="grid grid-cols-2 gap-2 mt-6 mb-4 flex-grow">
                        {version.features.map((feature, fIndex) => {
                          const isActive = feature.active;
                          const isVersionBundle = typeof feature.text === 'string' && feature.text.startsWith('All V');
                          return (
                            <div
                              key={fIndex}
                              className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-[#020617]/70 border border-slate-200 dark:border-slate-700/80 shadow-[0_0_0_1px_rgba(148,163,184,0.08)]"
                            >
                              {isActive ? (
                                <motion.span
                                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
                                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 flex-shrink-0" aria-hidden="true" />
                              )}

                              <span className={`leading-snug text-left truncate ${(isActive || isVersionBundle) ? 'font-semibold' : 'font-normal'}`}>
                                {feature.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                        {version.available ? (
                          <Button
                            variant="outline"
                            className="w-full h-8 rounded-lg text-[11px] font-medium border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            Explore Version
                          </Button>
                        ) : (
                          <div className="w-full text-center py-1.5 bg-muted/50 rounded-md border border-border">
                            <span className="text-[11px] text-slateMuted/80 italic">In Development</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )})}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;
