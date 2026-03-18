import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  CalendarClock,
  Database,
  DollarSign,
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
    id: 'v1',
    icon: Phone,
    label: 'Smart Receptionist',
    version: 'V1',
    goal: 'Replace manual appointment scheduling + reminders',
    tagline: '24/7 Coverage — Never miss a call again.',
    features: [
      { name: 'Inbound call handling', detail: 'AI answers, collects name/DOB, checks availability' },
      { name: 'Appointment booking',   detail: 'Schedules from live calendar, sends confirmation' },
      { name: 'Outbound reminders',    detail: 'SMS/call 24h before appointment' },
      { name: 'Cancellation handling', detail: 'Patient can cancel, AI updates calendar' },
      { name: 'Basic Q&A',             detail: 'Hours, location, insurance accepted' },
      { name: 'Database storage',      detail: 'Logs all calls, appointments, patient info' },
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
      { name: 'Callbacks',             detail: 'AI takes message, calls back at scheduled time' },
      { name: 'Missed appt outreach',  detail: 'Auto-calls to reschedule' },
      { name: 'Email responses',       detail: 'Reads/answers patient emails' },
      { name: 'Basic EMR read',        detail: 'Pulls patient history before call' },
      { name: 'Doctor pre-visit notes',detail: 'AI summarizes patient info for provider' },
      { name: 'Patient intake forms',  detail: 'Collects via SMS/email before visit' },
      { name: 'Insurance verification',detail: 'Checks basic eligibility' },
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
      { name: 'Two-way SMS',           detail: 'Full conversation via text' },
      { name: 'Web chat',              detail: 'Website visitor assistance' },
      { name: 'Portal integration',    detail: 'Syncs with patient portal' },
      { name: 'Multi-language',        detail: 'Supports Spanish, etc.' },
      { name: 'Prescription refills',  detail: 'Routes to provider' },
      { name: 'Test result follow-up', detail: 'Sends results, schedules follow-up' },
      { name: 'Referral management',   detail: 'Tracks referrals to specialists' },
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
      { name: 'Provider side app',     detail: 'Doctors log notes, instructions' },
      { name: 'AI learns from provider',detail: 'Improves based on feedback' },
      { name: 'Autonomous scheduling', detail: 'No human oversight needed' },
      { name: 'Complex Q&A',           detail: 'Answers medical questions (with guardrails)' },
      { name: 'Triage',                detail: 'Routes urgent cases to nurse' },
      { name: 'Insurance prior auth',  detail: 'Initiates authorization process' },
      { name: 'Billing support',       detail: 'Prepares claims data' },
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

const SEPARATOR_AFTER_IDX = 5;

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

// ─── Feature pane — dark reskin, no Tech Stack ────────────────────────────────
function FeatureFocusPane({ item, onOpenBusiness }) {
  return (
    <div className="flex flex-col gap-3" style={{ position:'relative', zIndex:1 }}>
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

      {/* Feature table */}
      <div className="flex flex-col gap-1">
        {item.features.map((f) => (
          <div key={f.name} className="flex gap-3 rounded-lg px-2.5 py-1.5"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-[11px] font-bold shrink-0" style={{ color:'rgba(0,112,243,1)', minWidth:116 }}>{f.name}</span>
            <span className="text-[11px] leading-tight" style={{ color:'#94A3B8' }}>{f.detail}</span>
          </div>
        ))}
      </div>

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
          return (
            <motion.div
              key={p.title}
              className="hud-scan-border"
              style={{ borderRadius:'0.75rem', padding:'0.85rem', background:'rgba(0,112,243,0.04)', border:'1px solid rgba(0,112,243,0.2)', transformStyle:'preserve-3d' }}
              initial={{ rotateY:0, opacity:0, x:10 }}
              animate={{ rotateY:rotations[i], opacity:1, x:0 }}
              transition={{ type:'spring', stiffness:200, damping:22, delay:i*0.08 }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color:'#F1F5F9' }}>{p.icon} {p.title}</p>
              <p className="text-[11px] leading-tight" style={{ color:'#94A3B8' }}>{p.body}</p>
            </motion.div>
          );
        })}
      </div>
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

// ─── Main HolographicSidebar ──────────────────────────────────────────────────
export default function HolographicSidebar() {
  const { hoveredIndex, setHoveredIndex } = useCortexSpline();
  const [isDesktop, setIsDesktop] = useState(true);
  const [showBusiness, setShowBusiness] = useState(false);
  const leaveTimer = useRef(null);
  const prevIdx = useRef(null);
  const slideDir = useRef(1);

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
        <div
          onMouseLeave={startLeave}
          onMouseEnter={clearLeave}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: zoneW,
            height: '100vh',
            zIndex: 65,
          }}
        >
          {/* Icon column */}
          <nav
            className="flex flex-col items-center py-6 gap-1"
            style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', zIndex:2, pointerEvents:'auto' }}
          >
            {SIDEBAR_DATA.map((item, idx) => {
              const Icon = item.icon;
              const isHov = hoveredIndex === idx;

              return (
                <React.Fragment key={item.id}>
                  {idx === SEPARATOR_AFTER_IDX + 1 && (
                    <div className="my-2 w-5" style={{ height:1, background:'rgba(100,116,139,0.2)' }} />
                  )}

                  <motion.div
                    className="relative flex items-center cursor-pointer"
                    style={{ width:48, height:44 }}
                    onMouseEnter={() => { clearLeave(); setHoveredIndex(idx); }}
                    initial={{ opacity:0, y:-20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.8 + idx*0.1, type:'spring', stiffness:300, damping:20 }}
                  >
                    <motion.div
                      className="flex items-center justify-center w-10 h-10 rounded-xl"
                      animate={{
                        boxShadow: isHov
                          ? '0 0 0 1.5px rgba(0,112,243,0.38), 0 0 20px rgba(0,112,243,0.2)'
                          : '0 0 0 0 transparent',
                        background: isHov ? 'rgba(0,112,243,0.08)' : 'transparent',
                      }}
                      transition={{ duration:0.2 }}
                    >
                      <Icon
                        size={21}
                        style={{
                          color: isHov ? ACCENT : ICON_MUTED,
                          transition:'color 0.2s ease',
                          filter: isHov ? 'drop-shadow(0 0 6px rgba(0,112,243,0.5))' : 'none',
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </nav>

          {/* Focus card — positioned inside the zone so there is no gap */}
          <div
            style={{
              position: 'absolute',
              left: CARD_LEFT,
              top: '50%',
              transform: 'translateY(-50%)',
              width: CARD_W,
              perspective: '1200px',
              pointerEvents: 'none',
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
                  {activeItem.type === 'security' ? (
                    <SecurityFocusPane item={activeItem} />
                  ) : activeItem.type === 'contact' ? (
                    <ContactFocusPane item={activeItem} />
                  ) : (
                    <FeatureFocusPane item={activeItem} onOpenBusiness={() => setShowBusiness(true)} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
      <nav
        className="flex flex-row items-center gap-1 px-3 py-2"
        style={{
          position:'fixed', bottom:16, left:'50%', transform:'translateX(-50%)',
          zIndex:200,
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          background:'rgba(6,10,22,0.8)',
          border:'1px solid rgba(0,112,243,0.25)',
          borderRadius:'9999px',
          boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {SIDEBAR_DATA.map((item, idx) => {
          const Icon = item.icon;
          const isActive = mobileActive === idx;
          return (
            <React.Fragment key={item.id}>
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
      </nav>

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
              {SIDEBAR_DATA[mobileActive].type === 'security' ? (
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
