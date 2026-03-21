import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  Activity,
  CalendarClock,
  Database,
  DollarSign,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  X,
  Zap,
} from 'lucide-react';
import { useCortexSpline } from '../App.jsx';

// ─── Design tokens ────────────────────────────────────────────────────────────
const CORTEX_BLUE = '#0070F3';
const ACCENT      = '#0070F3';
const ICON_MUTED  = '#475569';
const CARD_W      = 400;
const CARD_LEFT   = 140;
const CARD_BG     = 'rgba(6, 10, 22, 0.78)';
const CARD_BORDER = '1px solid rgba(0, 112, 243, 0.38)';
const CARD_SHADOW = '0 0 48px rgba(0,112,243,0.1), 0 28px 72px rgba(0,0,0,0.65)';

// ─── Full SIDEBAR_DATA ────────────────────────────────────────────────────────
const SIDEBAR_DATA = [
  {
    id: 'overview',
    icon: Home,
    label: 'Overview',
    type: 'overview',
    heading: 'CORTEX OS',
    subheading: 'Unified Practice Intelligence',
    pillars: [
      { label: 'Interface', value: 'Active', detail: '14.2k events processed today' },
      { label: 'Memory',    value: '8.4GB',  detail: '92% context retrieval accuracy' },
      { label: 'Engine',    value: 'v4.1.2', detail: '12ms average inference latency' }
    ]
  },
  {
    id: 'v1',
    icon: Phone,
    label: 'Smart Receptionist',
    version: 'V1',
    goal: 'Replace manual appointment scheduling + reminders',
    tagline: '24/7 Coverage — Never miss a call again.',
    features: [
      { name: 'Adaptive Voice Synthesis', detail: 'Natural human cadence and tone' },
      { name: 'Multi-threaded Intake',   detail: 'Handle 50+ concurrent calls seamlessly' },
      { name: 'Instant EMR Lookup',      detail: 'Identify patients by ANI/caller ID' },
      { name: 'Basic Triage',            detail: 'Route urgent cases to practitioners' },
      { name: 'Dynamic Q&A',             detail: 'Context-aware clinic information' },
      { name: 'Secure Data Vault',       detail: 'HIPAA-compliant logs and recordings' },
    ],
    pricing: { monthly: '$1,200/mo', setup: 'Setup: $499 (optional)', trial: 'Free trial: 2 months, 1 clinic' },
    whyNeeded: ['Never miss a call', '24/7 booking availability', 'Fewer no-shows', 'Staff focuses on patients'],
  },
  {
    id: 'v2',
    icon: Database,
    label: 'Clinical Integration',
    version: 'V2',
    goal: 'Handle callbacks, messages, and basic patient data sync',
    tagline: '0 Missed Calls — Every call answered instantly.',
    includes: 'All V1 features included',
    features: [
      { name: 'Proactive Callbacks',   detail: 'AI reconnects at scheduled availability' },
      { name: 'Missed Appt Outreach',  detail: 'Auto-reschedule high-intent patients' },
      { name: 'Neural Email Response', detail: 'Autonomous inbox management (98% acc)' },
      { name: 'Deep EMR Integration',  detail: 'Full longitudinal history review' },
      { name: 'Provider Pre-brief',    detail: 'Automated executive summary for doctors' },
      { name: 'Digital Patient Intake',detail: 'Dynamic forms via encrypted SMS' },
      { name: 'Eligibility Verify',    detail: 'Real-time insurance check' },
    ],
    pricing: { monthly: '$1,500 – $2,000/mo', setup: 'Included', trial: '' },
    whyNeeded: ['No manual callbacks', 'Doctors prepared before patient arrives', 'Less paperwork'],
  },
  {
    id: 'v3',
    icon: CalendarClock,
    label: 'Smart Schedule',
    version: 'V3',
    goal: 'Optimize schedule, collect payments, reduce no-shows further',
    tagline: '40% Fewer No-shows — Smart reminders that work.',
    includes: 'All V2 features included',
    features: [
      { name: 'Smart scheduling',      detail: 'AI learns peak times, books optimally' },
      { name: 'Waitlist management',   detail: 'Auto-fills cancellations' },
      { name: 'Payment collection',    detail: 'Copays, balances via phone/SMS' },
      { name: 'No-show prediction',    detail: 'Flags high-risk patients, double confirms' },
      { name: 'Multi-location',        detail: 'Books across clinics' },
      { name: 'Patient preferences',   detail: 'Learns preferred times/providers' },
    ],
    pricing: { monthly: '$2,000/mo', setup: 'Included', trial: 'Transaction fee: 2% on payments' },
    whyNeeded: ['Maximizes revenue per slot', 'Collects payments automatically', 'Reduces no-shows further'],
  },
  {
    id: 'v4',
    icon: MessageSquare,
    label: 'Patient Experience',
    version: 'V4',
    goal: 'Replace all patient communication channels',
    tagline: 'Full Patient Hub.',
    includes: 'All V3 features included',
    features: [
      { name: 'Cross-channel Continuity',detail: 'Unified SMS, Web, and Voice thread' },
      { name: 'Neural Translation',    detail: 'Real-time support for 40+ languages' },
      { name: 'Patient Hub Sync',      detail: 'Bi-directional portal data flow' },
      { name: 'Rx Refill Protocol',    detail: 'Automated routing to pharmacy/provider' },
      { name: 'Diagnostic Follow-up',  detail: 'Test results and next-step scheduling' },
      { name: 'Post-visit Sentiment',  detail: 'NLP-based patient satisfaction tracking' },
      { name: 'Referral Pipeline',     detail: 'Automated specialist coordination' },
    ],
    pricing: { monthly: '$2,500/mo', setup: 'Included', trial: 'Per-seat: $50/provider for portal access' },
    whyNeeded: ['Patients communicate how they prefer', 'One unified system', 'No missed messages'],
  },
  {
    id: 'v5',
    icon: Activity,
    label: 'Advanced Analytics',
    version: 'V5',
    goal: 'Use data to improve clinic operations',
    tagline: 'Predictive Analytics.',
    includes: 'All V4 features included',
    features: [
      { name: 'Demand forecasting',    detail: 'Predicts busy days, recommends staffing' },
      { name: 'Bottleneck detection',  detail: 'Identifies where patients wait' },
      { name: 'Provider performance',  detail: 'Shows cycle times, patient satisfaction' },
      { name: 'Revenue optimization',  detail: 'Suggests schedule changes to maximize income' },
      { name: 'Retention alerts',      detail: 'Flags at-risk patients' },
      { name: 'Automated marketing',   detail: 'Birthday emails, recall reminders' },
    ],
    pricing: { monthly: '$3,000/mo', setup: 'Included', trial: 'Enterprise: custom pricing for chains' },
    whyNeeded: ['Data-driven decisions', 'More revenue', 'Better patient retention'],
  },
  {
    id: 'v6',
    icon: Zap,
    label: 'Autonomous Front Line',
    version: 'V6',
    goal: 'AI handles everything — receptionist optional',
    tagline: 'Full Autonomy.',
    includes: 'All V5 features included',
    features: [
      { name: 'Provider Sidekick App', detail: 'Zero-touch clinical notes and logging' },
      { name: 'RLHF Feedback Loop',    detail: 'AI learns from provider corrections' },
      { name: 'Autonomous Schedule',   detail: 'Unsupervised optimization algorithms' },
      { name: 'Triage Engine V2',      detail: 'Advanced case prioritization and routing' },
      { name: 'Prior Auth Automator',  detail: 'Instant insurance authorization requests' },
      { name: 'Billing Architecture',  detail: 'Pre-coded claims data submission' },
    ],
    pricing: { monthly: '$3,500/mo', setup: 'Included', trial: 'Revenue share: 1% of clinic revenue (enterprise)' },
    whyNeeded: ['Run clinic with 1–2 fewer staff', 'Never miss revenue', 'Patients love 24/7 service'],
  },
  {
    id: 'security',
    icon: Shield,
    label: 'Security',
    type: 'security',
    heading: 'SECURITY & COMPLIANCE',
    subheading: 'Your data security is our top priority. Built from the ground up with privacy in mind.',
    badge: 'Certifications in Progress',
    pillars: [
      { title: 'HIPAA Compliance',  body: 'Full certification in progress. Architecture designed to meet all regulatory requirements.', icon: '🛡️' },
      { title: 'Data Encryption',   body: 'AES-256 at rest, TLS 1.3 in transit using industry-leading standards.', icon: '🔒' },
      { title: 'Private by Default',body: 'Data never leaves your designated infrastructure. No model training on patient data.', icon: '🔐' },
    ],
  },
  {
    id: 'contact',
    icon: Mail,
    label: 'Contact',
    type: 'contact',
    heading: 'TALK TO OUR TEAM',
    subheading: "We'd love to hear from you.",
    contacts: [
      { role: 'General', email: 'hello@cortex.ai' },
      { role: 'Sales',   email: 'sales@cortex.ai' },
      { role: 'Support', email: 'support@cortex.ai' },
    ],
  },
];

const SEPARATOR_AFTER_IDX = 6;

// ─── Revenue / Retention data ──────────────────────────────────────────────────
const REVENUE_STREAMS = [
  { stream: 'Monthly subscription', how: 'Flat fee per clinic',         v1:'$1,200', v2:'$1,500', v3:'$2,000', v4:'$2,500', v5:'$3,000', v6:'$3,500' },
  { stream: 'Per-provider fee',     how: 'Additional per doctor',       v1:'—', v2:'—', v3:'$25', v4:'$50', v5:'$75', v6:'$100' },
  { stream: 'Transaction fee',      how: '% of payments processed',     v1:'—', v2:'—', v3:'2%', v4:'2%', v5:'2%', v6:'2%' },
  { stream: 'Setup fee',            how: 'One-time onboarding',         v1:'$499', v2:'$499', v3:'$999', v4:'$999', v5:'$1,499', v6:'$1,999' },
  { stream: 'Enterprise contract',  how: 'Custom for chains',           v1:'—', v2:'—', v3:'—', v4:'—', v5:'✓', v6:'✓' },
  { stream: 'Revenue share',        how: '% of clinic revenue',         v1:'—', v2:'—', v3:'—', v4:'—', v5:'—', v6:'1% (opt)' },
  { stream: 'Training/consulting',  how: 'Optimization services',       v1:'—', v2:'—', v3:'✓', v4:'✓', v5:'✓', v6:'✓' },
];
const RETENTION_TACTICS = [
  { tactic:'Data portability cost', how:"Exporting data is manual, time-consuming" },
  { tactic:'Custom integrations',   how:"Built specifically for their EMR" },
  { tactic:'Historical analytics',  how:"Can't get trend data elsewhere" },
  { tactic:'Patient familiarity',   how:"Patients get used to the system" },
  { tactic:'Staff training',        how:"Staff learns your interface" },
  { tactic:'Continuous updates',    how:"New features = more value" },
  { tactic:'Multi-year contracts',  how:"Discount for commitment" },
  { tactic:'Revenue-based pricing', how:"The more they make, the more you make" },
];

// ─── ScanlineOverlay (mount-flash, 450ms) ────────────────────────────────────
function ScanlineOverlay() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 450);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return <div className="holo-scanline-overlay" />;
}

// ─── Business Model Overlay ───────────────────────────────────────────────────
function BusinessModelOverlay({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const thStyle = { padding:'6px 10px', fontSize:11, fontWeight:700, color:ACCENT, textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:'1px solid rgba(0,112,243,0.2)', whiteSpace:'nowrap', background:'rgba(0,112,243,0.04)' };
  const tdStyle = { padding:'5px 10px', fontSize:11, color:'#94A3B8', borderBottom:'1px solid rgba(255,255,255,0.06)' };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background:'rgba(0,0,0,0.75)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)' }} />
        <motion.div
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl focus-card-scanlines"
          style={{ backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', background:CARD_BG, border:CARD_BORDER, boxShadow:CARD_SHADOW, padding:'1.75rem', zIndex:1 }}
          initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.92, opacity:0 }}
          transition={{ type:'spring', stiffness:200, damping:24 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ScanlineOverlay />
          <div className="flex items-center justify-between mb-5" style={{ position:'relative', zIndex:1 }}>
            <div>
              <h2 className="font-black uppercase tracking-wider text-base" style={{ color:ACCENT, fontFamily:'"Inter Tight","Montserrat",sans-serif', textShadow:'0 0 12px rgba(0,112,243,0.4)' }}>Business Model</h2>
              <p className="text-xs mt-0.5" style={{ color:'#64748B' }}>Revenue Streams & Retention Tactics</p>
            </div>
            <button onClick={onClose} className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/10" style={{ color:'#64748B' }}>
              <X size={16} />
            </button>
          </div>

          <h3 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color:'#475569', position:'relative', zIndex:1 }}>Revenue Streams</h3>
          <div className="rounded-xl overflow-hidden mb-5" style={{ border:'1px solid rgba(0,112,243,0.15)', position:'relative', zIndex:1 }}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th style={thStyle}>Stream</th>
                  <th style={thStyle}>How It Works</th>
                  {['V1','V2','V3','V4','V5','V6'].map(v => <th key={v} style={{ ...thStyle, textAlign:'center' }}>{v}</th>)}
                </tr>
              </thead>
              <tbody>
                {REVENUE_STREAMS.map((row, i) => (
                  <tr key={row.stream} style={{ background: i%2===0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                    <td style={{ ...tdStyle, fontWeight:700, color:'#E2E8F0' }}>{row.stream}</td>
                    <td style={{ ...tdStyle }}>{row.how}</td>
                    {['v1','v2','v3','v4','v5','v6'].map(v => (
                      <td key={v} style={{ ...tdStyle, textAlign:'center', fontWeight:row[v]!=='—'?600:400, color:row[v]!=='—'?ACCENT:'#334155' }}>{row[v]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color:'#475569', position:'relative', zIndex:1 }}>Retention Tactics</h3>
          <div className="rounded-xl overflow-hidden" style={{ border:'1px solid rgba(0,112,243,0.15)', position:'relative', zIndex:1 }}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th style={thStyle}>Tactic</th>
                  <th style={thStyle}>How It Works</th>
                </tr>
              </thead>
              <tbody>
                {RETENTION_TACTICS.map((row, i) => (
                  <tr key={row.tactic} style={{ background: i%2===0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                    <td style={{ ...tdStyle, fontWeight:700, color:'#E2E8F0' }}>{row.tactic}</td>
                    <td style={{ ...tdStyle }}>{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Overview pane — Cortex OS pillars ───────────────────────────────────────
function OverviewFocusPane({ item }) {
  return (
    <div className="flex flex-col gap-4" style={{ position:'relative', zIndex:1 }}>
      <div>
        <h3 className="font-black uppercase tracking-widest text-lg mb-0.5"
          style={{ color:'#F1F5F9', fontFamily:'"Inter Tight","Montserrat",sans-serif', textShadow:'0 0 20px rgba(0,112,243,0.45)' }}>
          {item.heading}
        </h3>
        <p className="text-xs font-medium" style={{ color:ACCENT, letterSpacing:'0.02em' }}>{item.subheading}</p>
      </div>

      <div style={{ height:1, background:'rgba(0,112,243,0.15)' }} />

      <div className="flex flex-col gap-3">
        {item.pillars.map((p, i) => (
          <motion.div
            key={p.label}
            className="rounded-xl p-3"
            style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity:0, x:-10 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color:'#64748B' }}>{p.label}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10" style={{ color:ACCENT }}>{p.value}</span>
            </div>
            <p className="text-[11px] font-medium" style={{ color:'#94A3B8' }}>{p.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-2 p-3 rounded-xl border border-dashed border-slate-700/50 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">All systems operational</span>
      </div>
    </div>
  );
}

// ─── V1 Detail Cards Data ───────────────────────────────────────────────────────
const V1_DETAIL_CARDS = [
  {
    headline: "Sound Human, Not Robotic",
    points: [
      "AI-generated voice with natural pauses, intonation",
      "Matches regional accents and conversational cadence",
      "Adjusts speaking speed based on comprehension signals"
    ],
    stat: "98.6% caller satisfaction rate",
  },
  {
    headline: "50+ Calls. Zero Wait Time.",
    points: [
      "Parallel call handling — always answers instantly",
      "Intelligent call queuing with priority escalation",
      "Peak-hour scaling without added staff costs"
    ],
    stat: "Average hold time: 0 seconds",
  },
  {
    headline: "Know Your Patient Before They Speak",
    points: [
      "Auto-identifies patients via ANI (caller ID)",
      "Pulls up full history and medications in < 200ms",
      "Cross-references insurance and demographic records"
    ],
    stat: "< 200ms patient identification",
  },
  {
    headline: "Urgent Calls Get Through Instantly",
    points: [
      "NLP symptom recognition flags emergencies in real-time",
      "Routes urgent cases directly to available practitioners",
      "Logs triage decisions for compliance and review"
    ],
    stat: "Critical cases routed in < 3 seconds",
  },
  {
    headline: "Every Answer, Instantly",
    points: [
      "Trained on your clinic's specific operations and hours",
      "Handles FAQs, insurance queries, and prep instructions",
      "Continuously learns from new queries and corrections"
    ],
    stat: "95% first-call resolution rate",
  },
  {
    headline: "HIPAA-Grade Security, Built In",
    points: [
      "End-to-end encryption for all call recordings",
      "Automatic data retention policies for compliance",
      "Audit-ready logs with tamper-proof timestamps"
    ],
    stat: "AES-256 encryption · SOC 2 ready",
  }
];

const V2_DETAIL_CARDS = [
  {
    headline: "Never Lose a Patient to the Tone",
    points: [
      "Automatically logs dropped calls or busy signals",
      "Schedules a smart outbound call when lines are free",
      "Syncs caller ID to pick up exactly where they left off"
    ],
    stat: "Recovers 85% of dropped calls",
  },
  {
    headline: "Turn Missed Visits into Revenue",
    points: [
      "Instantly texts or calls patients who no-show",
      "Offers one-tap rescheduling for the next available slot",
      "Prioritizes high-intent or high-acuity patients automatically"
    ],
    stat: "Reduces no-shows by up to 40%",
  },
  {
    headline: "Inbox Zero, Automatically",
    points: [
      "Reads, categorizes, and responds to patient emails instantly",
      "Drafts complex medical replies for doctor approval",
      "Routes billing questions directly to the finance team"
    ],
    stat: "Saves 15+ hours per week on email",
  },
  {
    headline: "The Complete Patient Story",
    points: [
      "Reads decades of unstructured clinical notes in seconds",
      "Highlights contraindications and missing lab results",
      "Writes directly back to all major EHR/EMR platforms safely"
    ],
    stat: "Zero manual data entry required",
  },
  {
    headline: "Step into the Room Prepared",
    points: [
      "Generates a 3-bullet prep sheet before every appointment",
      "Flags recent hospitalizations or specialist visits",
      "Synthesizes patient chat/call history from the last 30 days"
    ],
    stat: "Saves 4 minutes per patient visit",
  },
  {
    headline: "Frictionless Mobile Intake",
    points: [
      "Sends adaptive, mobile-friendly forms via secure SMS",
      "Only asks questions relevant to the patient's specific visit",
      "Auto-populates known data so patients never repeat themselves"
    ],
    stat: "92% pre-visit completion rate",
  },
  {
    headline: "No More Coverage Surprises",
    points: [
      "Pings clearinghouses instantly before the appointment",
      "Calculates exact copays and deductibles automatically",
      "Flags inactive policies days before the patient arrives"
    ],
    stat: "Eliminates 99% of claim denials",
  }
];

const V3_DETAIL_CARDS = [
  {
    headline: "Fill Every Open Slot",
    points: [
      "Analyzes historical no-show data to overbook intelligently",
      "Suggests appointment types that match practitioner downtime",
      "Syncs instantly with your existing calendar platform"
    ],
    stat: "Increases daily bookings by 14%",
  },
  {
    headline: "Zero Downtime from Cancellations",
    points: [
      "Instantly identifies matching patients when a slot opens",
      "Sends priority SMS offers to patients waiting for early dates",
      "Automatically updates the schedule when a patient accepts"
    ],
    stat: "Fills 90% of cancelled slots",
  },
  {
    headline: "Frictionless Billing",
    points: [
      "Texts secure payment links immediately after visits",
      "Answers patient questions about statement details via AI",
      "Automatically follows up on unpaid copays or balances"
    ],
    stat: "Collects payments 3x faster",
  },
  {
    headline: "Stop No-Shows Before They Happen",
    points: [
      "Uses machine learning to identify high-risk appointments",
      "Triggers multi-channel confirmation workflows for at-risk patients",
      "Prioritizes live staff outreach for unconfirmed high-risk slots"
    ],
    stat: "Reduces last-minute drops by 40%",
  },
  {
    headline: "Unified Cross-Clinic Booking",
    points: [
      "Provides patients with options across all your locations",
      "Balances practitioner loads automatically across the network",
      "Seamlessly respects location-specific equipment constraints"
    ],
    stat: "Supports unlimited locations",
  },
  {
    headline: "The Ultimate Concierge Experience",
    points: [
      "Remembers if a patient prefers morning slots or specific doctors",
      "Automatically tailors future scheduling offers to past behavior",
      "Flags necessary accommodations (e.g. translation) for staff"
    ],
    stat: "98% patient satisfaction score",
  }
];

const V4_DETAIL_CARDS = [
  {
    headline: "One Continuous Conversation",
    points: [
      "Automatically syncs voice calls, SMS, and web chats",
      "Context carries over perfectly if patients switch channels",
      "Staff see the full timeline in a single unified dashboard"
    ],
    stat: "100% loss-less context switching",
  },
  {
    headline: "Speak Every Patient's Language",
    points: [
      "Detects caller language within the first 3 seconds",
      "Translates clinical terminology accurately in real-time",
      "Auto-localizes post-call SMS and email follow-ups"
    ],
    stat: "Supports 44 distinct languages",
  },
  {
    headline: "Live Portal Synchronization",
    points: [
      "Pushes updated demographics instantly to Epic/Cerner",
      "Uploads post-call transcripts directly into the patient chart",
      "Syncs portal messages to your standard inbox queue"
    ],
    stat: "Zero manual data wrangling",
  },
  {
    headline: "Zero-Touch Prescriptions",
    points: [
      "Verifies patient identity and last visit date automatically",
      "Routes authorized refills directly to the connected pharmacy",
      "Flags controlled substances for manual physician review"
    ],
    stat: "Automates 80% of refill requests",
  },
  {
    headline: "Close the Loop on Lab Work",
    points: [
      "Texts patients automatically when clean lab results return",
      "Prompts patients to schedule a follow-up for abnormal results",
      "Tracks which patients haven't completed ordered diagnostics"
    ],
    stat: "Improves care adherence by 35%",
  },
  {
    headline: "Know How They Really Feel",
    points: [
      "Analyzes voice tone during calls for hidden frustrations",
      "Sends adaptive, 1-click surveys after every remote interaction",
      "Flags poor patient experiences instantly to clinic managers"
    ],
    stat: "Catches 95% of unspoken issues",
  },
  {
    headline: "Leaks in Your Funnel, Plugged",
    points: [
      "Sends referral documents automatically to partner networks",
      "Follows up with patients to ensure they booked the specialist",
      "Alerts you if the specialist loop remains open after 14 days"
    ],
    stat: "Closes the referral loop 2x faster",
  }
];

const V5_DETAIL_CARDS = [
  {
    headline: "Staff Perfectly, Every Day",
    points: [
      "Predicts patient volume based on seasonality and local events",
      "Recommends optimal front-desk and clinical staffing levels",
      "Alerts management before staff burnout occurs"
    ],
    stat: "Reduces overtime costs by 22%",
  },
  {
    headline: "Eliminate the Waiting Room",
    points: [
      "Tracks patient dwell times from check-in to discharge",
      "Highlights specific rooms or steps causing schedule delays",
      "Auto-texts patients if the clinic is running behind"
    ],
    stat: "Cuts patient wait times in half",
  },
  {
    headline: "Empower Your Providers",
    points: [
      "Dashboards showing average consult times and chart completion",
      "Correlates specific providers with patient satisfaction scores",
      "Identifies training opportunities for faster EMR navigation"
    ],
    stat: "Improves clinical efficiency by 18%",
  },
  {
    headline: "Maximize Every Clinical Hour",
    points: [
      "Identifies low-yield appointment blocks and suggests changes",
      "Analyzes procedure profitability to prioritize marketing",
      "Dynamically adjusts booking rules to protect high-revenue slots"
    ],
    stat: "Increases profit margins by 12%",
  },
  {
    headline: "Never Lose a Patient",
    points: [
      "Flags patients who haven't booked follow-ups for chronic issues",
      "Identifies negative sentiment trends before patients leave",
      "Auto-generates personalized re-engagement campaigns"
    ],
    stat: "Boosts patient retention to 94%",
  },
  {
    headline: "Marketing on Autopilot",
    points: [
      "Sends automated birthday wishes and annual check-up reminders",
      "Targets specific demographics with preventative care campaigns",
      "Tracks conversion rates directly back to the schedule"
    ],
    stat: "Generates $5k+ in monthly recall revenue",
  }
];

const V6_DETAIL_CARDS = [
  {
    headline: "Focus on the Patient, Not the Screen",
    points: [
      "Listens securely to the ambient room conversation",
      "Drafts complete SOAP notes instantly upon visit conclusion",
      "Extracts structured data directly into specific EMR fields"
    ],
    stat: "Saves 2.5 hours of charting per day",
  },
  {
    headline: "An AI That Learns Your Style",
    points: [
      "Adapts note structure based on your specific edits (RLHF)",
      "Learns particular phrasing and common shorthand over time",
      "Zero prompt-engineering required from physicians"
    ],
    stat: "Accuracy improves with every edit",
  },
  {
    headline: "Self-Healing Schedules",
    points: [
      "AI autonomously moves appointments to close schedule gaps",
      "Negotiates new times with patients entirely via SMS/Voice",
      "Operates 24/7 without any human oversight or approval needed"
    ],
    stat: "Operates with true zero-touch autonomy",
  },
  {
    headline: "Sub-second Clinical Routing",
    points: [
      "Re-routes critical lab results instantly to the on-call doctor",
      "Bypasses front desk entirely for known high-priority cohorts",
      "Dynamically scales triage strictness based on clinic bandwidth"
    ],
    stat: "100% adherence to clinical protocols",
  },
  {
    headline: "End the Prior Auth Nightmare",
    points: [
      "Generates complete clinical justification packets instantly",
      "Interfaces directly with payer portals via RPA where possible",
      "Tracks auth status and automatically answers payer follow-ups"
    ],
    stat: "Reduces auth turnaround by 4 days",
  },
  {
    headline: "Code As You Go",
    points: [
      "Suggests accurate ICD-10 and CPT codes straight from the note",
      "Flags missing documentation required for specific billing codes",
      "Submits clean claims instantly upon note signature"
    ],
    stat: "Increases first-pass claim acceptance",
  }
];

const SECURITY_DETAIL_CARDS = [
  {
    headline: "Enterprise-Grade Healthcare Compliance",
    points: [
      "BAAs available for all enterprise and mid-market customers",
      "Strict data isolation between different tenant clinic environments",
      "Annual third-party penetration testing and compliance audits"
    ],
    stat: "100% HIPAA and SOC2 Type II aligned",
  },
  {
    headline: "Zero-Knowledge Encryption Standard",
    points: [
      "All patient audio and transcripts encrypted with AES-256",
      "Automated key rotation every 30 days for maximum security",
      "Granular RBAC (Role-Based Access Control) for your own staff"
    ],
    stat: "Bank-level encryption at rest & transit",
  },
  {
    headline: "Your Data is Your Data",
    points: [
      "We never use your patient interactions to train public AI models",
      "Automated PII scrubbing scripts run before any data storage",
      "Self-serve data deletion portals to comply with patient requests"
    ],
    stat: "Zero external model training",
  }
];

// ─── Feature pane — dark reskin, no Tech Stack ────────────────────────────────
function FeatureFocusPane({ item, onOpenBusiness }) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [detailPos, setDetailPos] = useState({ top: 0 });
  const rowRefs = useRef([]);
  const timeoutRef = useRef(null);

  const { scrollY } = useScroll();
  const sidebarOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const sidebarPointerEvents = useTransform(scrollY, [0, 400], ['auto', 'none']);

  const handleMouseEnter = (idx, version) => {
    if (version !== 'V1' && version !== 'V2' && version !== 'V3' && version !== 'V4' && version !== 'V5' && version !== 'V6') return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const el = rowRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      setDetailPos({ top: rect.top });
    }
    setActiveFeature({ idx, version });
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveFeature(null);
    }, 150);
  };

  const handleCardMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleCardMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveFeature(null);
    }, 150);
  };

  let activeData = null;
  if (activeFeature) {
    if (activeFeature.version === 'V1') activeData = V1_DETAIL_CARDS[activeFeature.idx];
    else if (activeFeature.version === 'V2') activeData = V2_DETAIL_CARDS[activeFeature.idx];
    else if (activeFeature.version === 'V3') activeData = V3_DETAIL_CARDS[activeFeature.idx];
    else if (activeFeature.version === 'V4') activeData = V4_DETAIL_CARDS[activeFeature.idx];
    else if (activeFeature.version === 'V5') activeData = V5_DETAIL_CARDS[activeFeature.idx];
    else if (activeFeature.version === 'V6') activeData = V6_DETAIL_CARDS[activeFeature.idx];
  }

  return (
    <div className="flex flex-col gap-3" style={{ position:'relative', zIndex:1, perspective: '1000px' }}>
      {/* Version badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full"
          style={{ color:'#fff', background:ACCENT, letterSpacing:'0.1em' }}>
          {item.version}
        </span>
        {item.includes && (
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:'rgba(255,255,255,0.08)', color:'#94A3B8', border:'1px solid rgba(255,255,255,0.1)' }}>
            {item.includes}
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <h3 className="font-black uppercase tracking-wider text-base mb-0.5"
          style={{ color:'#F1F5F9', fontFamily:'"Inter Tight","Montserrat",sans-serif', textShadow:'0 0 16px rgba(0,112,243,0.25)' }}>
          {item.label}
        </h3>
        <p className="text-[11px] leading-snug" style={{ color:ACCENT }}>{item.goal}</p>
        <p className="text-sm leading-relaxed mt-1 font-semibold" style={{ color:'#CBD5E1' }}>{item.tagline}</p>
      </div>

      {/* Feature rows */}
      <div className="flex flex-col gap-1.5" style={{ transformStyle: 'preserve-3d' }}>
        {item.features.map((f, idx) => {
          const isHovered = activeFeature?.idx === idx && activeFeature?.version === item.version;
          return (
            <motion.div
              key={f.name}
              ref={(el) => { rowRefs.current[idx] = el; }}
              className="flex gap-3 rounded-lg px-2.5 py-2 group cursor-default"
              style={{ 
                background: isHovered
                  ? 'rgba(0,112,243,0.10)'
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isHovered ? 'rgba(0,112,243,0.35)' : 'rgba(255,255,255,0.07)'}`,
                transformStyle: 'preserve-3d',
                transition: 'background 0.15s ease, border-color 0.15s ease',
              }}
              initial={{ x: -40, opacity: 0, rotateY: -15, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 18,
                delay: idx * 0.06,
              }}
              onMouseEnter={() => handleMouseEnter(idx, item.version)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-[11px] font-bold shrink-0 transition-colors group-hover:text-white" style={{ color:'rgba(0,112,243,1)', minWidth:116 }}>{f.name}</span>
              <span className="text-[11px] leading-tight transition-colors group-hover:text-slate-200" style={{ color:'#94A3B8' }}>{f.detail}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Portal: Detail card for V1-V6 */}
      {['V1', 'V2', 'V3', 'V4', 'V5', 'V6'].includes(item.version) && ReactDOM.createPortal(
        <motion.div style={{ opacity: sidebarOpacity, pointerEvents: sidebarPointerEvents, position: 'absolute', zIndex: 200, left: 0, top: 0 }}>
        <AnimatePresence mode="wait">
          {activeFeature !== null && activeData && item.version === activeFeature.version && (
            <motion.div
              key={`${activeFeature.version}-${activeFeature.idx}`}
              initial={{ opacity: 0, x: -12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.6 }}
              style={{
                position: 'fixed',
                left: CARD_LEFT + CARD_W + 16,
                top: Math.max(80, detailPos.top - 20),
                width: 300,
                zIndex: 200,
                background: CARD_BG,
                border: CARD_BORDER,
                borderRadius: '1rem',
                padding: '1.1rem',
                boxShadow: CARD_SHADOW,
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                pointerEvents: 'auto',
              }}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <div style={{ height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: '0.75rem' }} />
              <h4 className="text-[13px] font-black mb-2.5 leading-tight" style={{ color: '#F1F5F9', fontFamily: '"Inter Tight","Montserrat",sans-serif', textShadow: '0 0 12px rgba(0,112,243,0.3)' }}>
                {activeData.headline}
              </h4>
              <div className="flex flex-col gap-1.5 mb-3">
                {activeData.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full mt-[5px] shrink-0" style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
                    <span className="text-[11px] leading-relaxed" style={{ color: '#CBD5E1' }}>{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(0,112,243,0.1)', border: '1px solid rgba(0,112,243,0.2)' }}>
                <Activity size={11} className="text-blue-400 shrink-0" />
                <span className="text-[10px] font-black tracking-wide" style={{ color: ACCENT }}>
                  {activeData.stat}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>,
        document.body
      )}

      {/* Divider */}
      <div style={{ height:1, background:'rgba(0,112,243,0.15)' }} />

      {/* Pricing */}
      <div className="flex flex-col gap-0.5">
        <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color:'#94A3B8' }}>Pricing</p>
        <span className="text-xl font-black" style={{ color:ACCENT, textShadow:'0 0 12px rgba(0,112,243,0.35)' }}>
          {item.pricing.monthly}
        </span>
        {item.pricing.setup && <span className="text-[11px]" style={{ color:'#94A3B8' }}>{item.pricing.setup}</span>}
        {item.pricing.trial && <span className="text-[11px]" style={{ color:'#94A3B8' }}>{item.pricing.trial}</span>}
      </div>

      {/* Why They Need It */}
      <div className="flex flex-col gap-1">
        <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color:'#94A3B8' }}>Why They Need It</p>
        {item.whyNeeded.map((w) => (
          <div key={w} className="flex items-start gap-2 text-[11px]" style={{ color:'#CBD5E1' }}>
            <span style={{ color:ACCENT, marginTop:1, flexShrink:0 }}>▸</span>
            {w}
          </div>
        ))}
      </div>

      {/* Business model link */}
      <button
        onClick={(e) => { e.stopPropagation(); onOpenBusiness(); }}
        className="mt-1 flex items-center gap-1.5 text-[10px] font-bold tracking-wide transition-all hover:opacity-80 self-start"
        style={{ color:ACCENT, pointerEvents:'auto' }}
      >
        <DollarSign size={11} />
        View Business Model
      </button>
    </div>
  );
}

// ─── Security pane — dark reskin, fan-out pillar cards ────────────────────────
function SecurityFocusPane({ item }) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [detailPos, setDetailPos] = useState({ top: 0 });
  const rowRefs = useRef([]);
  const timeoutRef = useRef(null);

  const { scrollY } = useScroll();
  const sidebarOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const sidebarPointerEvents = useTransform(scrollY, [0, 400], ['auto', 'none']);

  const handleMouseEnter = (idx) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const el = rowRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      setDetailPos({ top: rect.top });
    }
    setActiveFeature(idx);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveFeature(null);
    }, 150);
  };

  const handleCardMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleCardMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveFeature(null);
    }, 150);
  };

  return (
    <div className="flex flex-col gap-3" style={{ position:'relative', zIndex:1 }}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background:'rgba(0,112,243,0.12)', color:ACCENT, border:'1px solid rgba(0,112,243,0.3)' }}>
          {item.badge}
        </span>
      </div>
      <div>
        <h3 className="font-black uppercase tracking-wider text-base mb-0.5"
          style={{ color:'#F1F5F9', fontFamily:'"Inter Tight","Montserrat",sans-serif', textShadow:'0 0 16px rgba(0,112,243,0.25)' }}>
          {item.heading}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color:'#94A3B8' }}>{item.subheading}</p>
      </div>
      <div className="flex flex-col gap-2 mt-1" style={{ perspective:'600px', transformStyle:'preserve-3d' }}>
        {item.pillars.map((p, i) => {
          const rotations = [-8, 0, 8];
          const isHovered = activeFeature === i;
          return (
            <motion.div
              key={p.title}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="hud-scan-border group cursor-default"
              style={{
                borderRadius:'0.75rem',
                padding:'0.85rem',
                background: isHovered ? 'rgba(0,112,243,0.10)' : 'rgba(0,112,243,0.04)',
                border:`1px solid ${isHovered ? 'rgba(0,112,243,0.35)' : 'rgba(0,112,243,0.2)'}`,
                transformStyle:'preserve-3d',
                transition: 'background 0.15s ease, border-color 0.15s ease'
              }}
              initial={{ rotateY:0, opacity:0, x:10 }}
              animate={{ rotateY: isHovered ? 0 : rotations[i], opacity:1, x:0, scale: isHovered ? 1.02 : 1 }}
              transition={{ type:'spring', stiffness:200, damping:22, delay:i*0.08 }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color:'#F1F5F9' }}>{p.icon} {p.title}</p>
              <p className="text-[11px] leading-tight" style={{ color:'#94A3B8' }}>{p.body}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Portal Detail Card */}
      {ReactDOM.createPortal(
        <motion.div style={{ opacity: sidebarOpacity, pointerEvents: sidebarPointerEvents, position: 'absolute', zIndex: 200, left: 0, top: 0 }}>
        <AnimatePresence mode="wait">
          {activeFeature !== null && (
            <motion.div
              key={`sec-${activeFeature}`}
              initial={{ opacity: 0, x: -12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.6 }}
              style={{
                position: 'fixed',
                left: CARD_LEFT + CARD_W + 16,
                top: Math.max(80, detailPos.top - 20),
                width: 300,
                zIndex: 200,
                background: CARD_BG,
                border: CARD_BORDER,
                borderRadius: '1rem',
                padding: '1.1rem',
                boxShadow: CARD_SHADOW,
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                pointerEvents: 'auto',
              }}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <div style={{ height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: '0.75rem' }} />
              <h4 className="text-[13px] font-black mb-2.5 leading-tight" style={{ color: '#F1F5F9', fontFamily: '"Inter Tight","Montserrat",sans-serif', textShadow: '0 0 12px rgba(0,112,243,0.3)' }}>
                {SECURITY_DETAIL_CARDS[activeFeature].headline}
              </h4>
              <div className="flex flex-col gap-1.5 mb-3">
                {SECURITY_DETAIL_CARDS[activeFeature].points.map((point, k) => (
                  <div key={k} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full mt-[5px] shrink-0" style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
                    <span className="text-[11px] leading-relaxed" style={{ color: '#CBD5E1' }}>{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(0,112,243,0.1)', border: '1px solid rgba(0,112,243,0.2)' }}>
                <Activity size={11} className="text-blue-400 shrink-0" />
                <span className="text-[10px] font-black tracking-wide" style={{ color: ACCENT }}>
                  {SECURITY_DETAIL_CARDS[activeFeature].stat}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>,
        document.body
      )}
    </div>
  );
}

// ─── Contact pane — dark reskin, core-expansion ───────────────────────────────
function ContactFocusPane({ item }) {
  const [form, setForm] = useState({ name:'', email:'', practice:'', version:'', message:'' });
  const versions = ['V1','V2','V3','V4','V5','V6'];

  const inputStyle = {
    background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(0,112,243,0.2)',
    borderRadius:'0.5rem',
    padding:'7px 11px',
    fontSize:12,
    color:'#E2E8F0',
    outline:'none',
    width:'100%',
  };

  const fieldVar = {
    hidden:  { opacity:0, y:14, scale:0.97 },
    visible: (i) => ({ opacity:1, y:0, scale:1, transition:{ type:'spring', stiffness:220, damping:18, delay:i*0.06 } }),
  };

  return (
    <div className="flex flex-col gap-2.5 hud-noise-overlay" style={{ borderRadius:'1rem', overflow:'hidden', position:'relative', zIndex:1 }}>
      <div style={{ position:'relative', zIndex:1 }}>
        <h3 className="font-black uppercase tracking-wider text-base mb-0.5"
          style={{ color:'#F1F5F9', fontFamily:'"Inter Tight","Montserrat",sans-serif', textShadow:'0 0 16px rgba(0,112,243,0.25)' }}>
          {item.heading}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color:'#94A3B8' }}>{item.subheading}</p>
      </div>

      {[
        { key:'name',     placeholder:'Maya Chen',        custom:0 },
        { key:'email',    placeholder:'maya@example.com', custom:1 },
        { key:'practice', placeholder:'Meridian Medical', custom:2 },
      ].map(({ key, placeholder, custom }) => (
        <motion.input key={key} style={{ ...inputStyle, position:'relative', zIndex:1 }}
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
          variants={fieldVar} initial="hidden" animate="visible" custom={custom}
        />
      ))}

      <motion.div variants={fieldVar} initial="hidden" animate="visible" custom={3}
        className="flex gap-1.5 flex-wrap" style={{ position:'relative', zIndex:1 }}>
        {versions.map(v => (
          <button key={v}
            onClick={() => setForm(f => ({ ...f, version: f.version===v ? '' : v }))}
            className="text-[11px] px-2.5 py-1 rounded-full transition-all"
            style={{
              background: form.version===v ? ACCENT : 'rgba(255,255,255,0.05)',
              color: form.version===v ? '#fff' : '#94A3B8',
              border: `1px solid ${form.version===v ? ACCENT : 'rgba(255,255,255,0.1)'}`,
              fontWeight:600,
            }}>
            {v}
          </button>
        ))}
      </motion.div>

      <motion.textarea variants={fieldVar} initial="hidden" animate="visible" custom={4}
        style={{ ...inputStyle, minHeight:60, resize:'none', position:'relative', zIndex:1 }}
        placeholder="Tell us more about your needs..."
        value={form.message}
        onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
      />

      <motion.button
        className="w-full py-2.5 rounded-lg text-xs font-black tracking-wider hover:opacity-90 active:scale-[0.98] transition-opacity"
        style={{ background:`linear-gradient(135deg, ${ACCENT}, #0058CC)`, color:'#fff', boxShadow:'0 4px 20px rgba(0,112,243,0.35)', position:'relative', zIndex:1 }}
      >
        Send Message
      </motion.button>

      <div className="flex flex-col gap-1 pt-2" style={{ borderTop:'1px solid rgba(0,112,243,0.15)', position:'relative', zIndex:1 }}>
        {item.contacts.map(c => (
          <div key={c.role} className="flex justify-between items-center">
            <span className="text-[11px] font-medium" style={{ color:'#94A3B8' }}>{c.role}</span>
            <a href={`mailto:${c.email}`} className="text-[11px] font-semibold hover:underline" style={{ color:ACCENT }}>{c.email}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Directional slide variants for CortexFocusCard ───────────────────────────
const SLIDE_DISTANCE = 60;

const focusCardVariants = {
  initial: (dir) => ({
    opacity: 0,
    scale: 0.92,
    y: dir * SLIDE_DISTANCE,
    filter: 'blur(4px)',
  }),
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: (dir) => ({
    opacity: 0,
    scale: 0.92,
    y: dir * -SLIDE_DISTANCE,
    filter: 'blur(4px)',
  }),
};

const focusCardTransition = { type: 'spring', stiffness: 110, damping: 18, mass: 0.9 };

const SidebarNavItem = ({ item, idx, total, hoveredIndex, setHoveredIndex, clearLeave }) => {
  const { scrollY } = useScroll();
  const Icon = item.icon;
  const isHov = hoveredIndex === idx;

  // Staggered fade: Bottom-most (idx: total-1) fades first, Top-most (idx: 0) fades last.
  // Range: Starts at 150, ends at 1050 total across the stack.
  const staggerOffset = (total - idx - 1) * 100; 
  const start = 150 + staggerOffset;
  const end = 550 + staggerOffset;
  
  const itemOpacity = useTransform(scrollY, [start, end], [1, 0]);
  const itemScale = useTransform(scrollY, [start, end], [1, 0.8]);

  return (
    <motion.div
      className="relative flex items-center cursor-pointer"
      style={{ width: 48, height: 44, opacity: itemOpacity, scale: itemScale }}
      onMouseEnter={() => { clearLeave(); setHoveredIndex(idx); }}
    >
      <motion.div
        className="flex items-center justify-center w-10 h-10 rounded-xl"
        animate={{
          boxShadow: isHov
            ? '0 0 0 1.5px rgba(0,112,243,0.38), 0 0 20px rgba(0,112,243,0.2)'
            : '0 0 0 0 transparent',
          background: isHov ? 'rgba(0,112,243,0.08)' : 'transparent',
          ...(idx === 0 ? {
            opacity: [0.7, 1, 0.7],
            scale: [0.98, 1.02, 0.98],
          } : {})
        }}
        transition={idx === 0 ? {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        } : { duration: 0.2 }}
      >
        <Icon
          size={21}
          style={{
            color: isHov ? ACCENT : ICON_MUTED,
            transition: 'color 0.2s ease',
            filter: isHov ? 'drop-shadow(0 0 6px rgba(0,112,243,0.5))' : 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function HolographicSidebar() {
  const { hoveredIndex, setHoveredIndex } = useCortexSpline();
  const [isDesktop, setIsDesktop] = useState(true);
  const [showBusiness, setShowBusiness] = useState(false);
  const leaveTimer = useRef(null);
  const prevIdx = useRef(null);
  const slideDir = useRef(1);

  const { scrollY } = useScroll();
  const desktopZoneOpacity = useTransform(scrollY, [150, 1150], [1, 0]);
  const desktopZonePointerEvents = useTransform(scrollY, [150, 1150], ['auto', 'none']);
  
  // Focus Card specific transforms: synchronized to 400px duration (same as icons)
  const focusCardOpacity = useTransform(scrollY, [150, 550], [1, 0]);
  const focusCardScale = useTransform(scrollY, [150, 550], [1, 0.95]);

  // Legacy references
  const sidebarOpacity = desktopZoneOpacity;
  const sidebarPointerEvents = desktopZonePointerEvents;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (hoveredIndex !== null && hoveredIndex !== prevIdx.current) {
    slideDir.current = (prevIdx.current === null || hoveredIndex > prevIdx.current) ? 1 : -1;
    prevIdx.current = hoveredIndex;
  }

  const clearLeave = () => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
  };

  const startLeave = () => {
    clearLeave();
    leaveTimer.current = setTimeout(() => setHoveredIndex(null), 500);
  };

  const activeItem = hoveredIndex !== null ? SIDEBAR_DATA[hoveredIndex] : null;
  const zoneW = hoveredIndex !== null ? CARD_LEFT + CARD_W + 24 : 68;

  // ── Desktop ────────────────────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <>
        {/* Single zone wrapper: icons + gap + card. One onMouseLeave. */}
        <motion.div
          onMouseLeave={startLeave}
          onMouseEnter={clearLeave}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: zoneW,
            height: '100vh',
            zIndex: 65,
            opacity: sidebarOpacity,
            pointerEvents: sidebarPointerEvents,
          }}
        >
          {/* Icon column */}
          <nav
            className="flex flex-col items-center justify-center py-10 gap-1"
            style={{ 
              position:'absolute', 
              left:16, 
              top:0, 
              bottom:0, 
              zIndex:2, 
              pointerEvents:'auto' 
            }}
          >

            {SIDEBAR_DATA.map((item, idx) => (
              <React.Fragment key={item.id}>
                {idx === 1 && (
                  <div className="my-3 w-5" style={{ height: 1, background: 'rgba(100,116,139,0.15)' }} />
                )}
                {idx === SEPARATOR_AFTER_IDX + 1 && (
                  <div className="my-3 w-5" style={{ height: 1, background: 'rgba(100,116,139,0.15)' }} />
                )}
                <SidebarNavItem
                  item={item}
                  idx={idx}
                  total={SIDEBAR_DATA.length}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  clearLeave={clearLeave}
                />
              </React.Fragment>
            ))}
          </nav>

          {/* Focus card — positioned inside the zone so there is no gap */}
          <motion.div
            style={{
              position: 'absolute',
              left: CARD_LEFT,
              top: '50%',
              y: '-50%',
              width: CARD_W,
              perspective: '1200px',
              pointerEvents: useTransform(scrollY, [150, 550], ['auto', 'none']),
              opacity: focusCardOpacity,
              scale: focusCardScale,
            }}
          >
            <AnimatePresence mode="wait" custom={slideDir.current}>
              {activeItem && (
                <motion.div
                  key={activeItem.id}
                  custom={slideDir.current}
                  variants={focusCardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={focusCardTransition}
                  className="focus-card-scanlines hide-scrollbar"
                  style={{
                    width: CARD_W,
                    maxHeight: '72vh',
                    overflowY: 'auto',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    background: CARD_BG,
                    border: CARD_BORDER,
                    borderRadius: '1.5rem',
                    padding: '1.4rem',
                    boxShadow: CARD_SHADOW,
                    pointerEvents: 'auto',
                  }}
                >
                  <ScanlineOverlay />
                  {activeItem.type === 'overview' ? (
                    <OverviewFocusPane item={activeItem} />
                  ) : activeItem.type === 'security' ? (
                    <SecurityFocusPane item={activeItem} />
                  ) : activeItem.type === 'contact' ? (
                    <ContactFocusPane item={activeItem} />
                  ) : (
                    <FeatureFocusPane item={activeItem} onOpenBusiness={() => setShowBusiness(true)} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showBusiness && <BusinessModelOverlay onClose={() => setShowBusiness(false)} />}
        </AnimatePresence>
      </>
    );
  }

  // ── Mobile: bottom bar + modal ─────────────────────────────────────────────
  const [mobileActive, setMobileActive] = useState(null);

  return (
    <>
      <motion.nav
        className="flex flex-row items-center gap-1 px-3 py-2"
        style={{
          position:'fixed', bottom:16, left:'50%', transform:'translateX(-50%)',
          zIndex:200,
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          background:'rgba(6,10,22,0.8)',
          border:'1px solid rgba(0,112,243,0.25)',
          borderRadius:'9999px',
          boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
          opacity: mobileNavOpacity,
          pointerEvents: mobileNavPointerEvents,
        }}
      >
        {SIDEBAR_DATA.map((item, idx) => {
          const Icon = item.icon;
          const isActive = mobileActive === idx;
          return (
            <React.Fragment key={item.id}>
              {idx === 1 && (
                <div className="mx-1 h-5" style={{ width:1, background:'rgba(100,116,139,0.25)' }} />
              )}
              {idx === SEPARATOR_AFTER_IDX + 1 && (
                <div className="mx-1 h-5" style={{ width:1, background:'rgba(100,116,139,0.25)' }} />
              )}
              <motion.div
                className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer"
                animate={{ background: isActive ? 'rgba(0,112,243,0.14)' : 'transparent' }}
                onClick={() => setMobileActive(mobileActive===idx ? null : idx)}
                whileTap={{ scale:0.9 }}
              >
                <Icon size={20} style={{ color: isActive ? ACCENT : ICON_MUTED }} />
              </motion.div>
            </React.Fragment>
          );
        })}
      </motion.nav>

      <AnimatePresence mode="wait">
        {mobileActive !== null && SIDEBAR_DATA[mobileActive] && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[199]"
              style={{ background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)' }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setMobileActive(null)}
            />
            <motion.div
              key={SIDEBAR_DATA[mobileActive].id}
              className="fixed z-[200] focus-card-scanlines"
              style={{
                top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                width:'90vw', maxWidth:380, maxHeight:'82vh', overflowY:'auto',
                backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)',
                background:CARD_BG, border:CARD_BORDER, borderRadius:'1.5rem',
                padding:'1.4rem', boxShadow:CARD_SHADOW,
              }}
              initial={{ opacity:0, scale:0.88, filter:'blur(5px)' }}
              animate={{ opacity:1, scale:1,    filter:'blur(0px)' }}
              exit={{    opacity:0, scale:0.88, filter:'blur(5px)' }}
              transition={{ type:'spring', stiffness:200, damping:24 }}
            >
              <ScanlineOverlay />
              {SIDEBAR_DATA[mobileActive].type === 'overview' ? (
                <OverviewFocusPane item={SIDEBAR_DATA[mobileActive]} />
              ) : SIDEBAR_DATA[mobileActive].type === 'security' ? (
                <SecurityFocusPane item={SIDEBAR_DATA[mobileActive]} />
              ) : SIDEBAR_DATA[mobileActive].type === 'contact' ? (
                <ContactFocusPane item={SIDEBAR_DATA[mobileActive]} />
              ) : (
                <FeatureFocusPane item={SIDEBAR_DATA[mobileActive]} onOpenBusiness={() => setShowBusiness(true)} />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBusiness && <BusinessModelOverlay onClose={() => setShowBusiness(false)} />}
      </AnimatePresence>
    </>
  );
}
