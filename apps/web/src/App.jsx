
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import FloatingCortex from './components/FloatingCortex.jsx';
import HolographicSidebar from './components/HolographicSidebar.jsx';
import HomePage from './pages/HomePage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import TrustPage from './pages/TrustPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PortalPage from './pages/PortalPage.jsx';
import AIPlayground from './components/AIPlayground.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ReactLenis } from '@studio-freight/react-lenis';

// ── Shared context for Spline ref, gaze sync, and glow state ──────────────────
export const CortexSplineContext = createContext({
  splineRef: { current: null },
  activeIndex: null,
  setActiveIndex: () => {},
  hoveredIndex: null,
  setHoveredIndex: () => {},
});

export function useCortexSpline() {
  return useContext(CortexSplineContext);
}

// ── Page transition config ────────────────────────────────────────────────────
const TRANSITION_SPEED = 0.8;
const LINGER_OPACITY = 0;

const pageTransition = {
  initial: { opacity: LINGER_OPACITY, filter: 'blur(10px)', y: 12 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
  exit: { opacity: LINGER_OPACITY, filter: 'blur(10px)', y: -12 },
  transition: { duration: TRANSITION_SPEED, ease: [0.43, 0.13, 0.23, 0.96] },
};

// ── "System Online" toast ─────────────────────────────────────────────────────
function SystemToast() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 1.6, duration: 0.5, ease: 'easeOut' }}
          className="fixed top-[3.4rem] right-[2rem] z-[200] flex items-center gap-2 px-3.5 py-2 rounded-full"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(0, 112, 243, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: '#22c55e',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)',
              animation: 'pulse 2s infinite',
            }}
          />
          <span
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: '#475569', letterSpacing: '0.12em' }}
          >
            System Online
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Animated routes ───────────────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
    >
      <motion.main
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
        style={{ willChange: 'opacity, transform, filter' }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/trust" element={<TrustPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/ai-playground" element={<AIPlayground />} />
          <Route
            path="*"
            element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold text-slateText mb-4">404</h1>
                <p className="text-slateMuted mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="text-primary hover:underline">
                  Return Home
                </a>
              </div>
            }
          />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useState('light');
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [splineReady, setSplineReady] = useState(false);
  const splineRef = useRef(null);

  // Removed dark mode persistence entirely
  useEffect(() => {
    setTheme('light');
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  // Color themes (only blue + black remain)
  const COLOR_THEME_KEY = 'colorTheme';
  const COLOR_THEMES = ['blue', 'black'];

  function applyColorTheme(value) {
    const root = document.documentElement;
    root.classList.remove('theme-black');
    if (value === 'black') root.classList.add('theme-black');
  }

  useEffect(() => {
    const saved = localStorage.getItem(COLOR_THEME_KEY);
    if (COLOR_THEMES.includes(saved)) {
      applyColorTheme(saved);
    }
  }, []);

  // Keyboard shortcuts: Shift+B = blue, Shift+L = black (no effect in dark mode)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (theme === 'dark') return;
      if (!e.shiftKey) return;
      const key = e.key?.toUpperCase();
      if (key === 'B') {
        e.preventDefault();
        localStorage.setItem(COLOR_THEME_KEY, 'blue');
        applyColorTheme('blue');
      } else if (key === 'L') {
        e.preventDefault();
        localStorage.setItem(COLOR_THEME_KEY, 'black');
        applyColorTheme('black');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [theme]);

  const toggleTheme = useMemo(
    () => () =>
      setTheme((t) => {
        const next = t === 'dark' ? 'light' : 'dark';
        if (next === 'dark') {
          const color = localStorage.getItem(COLOR_THEME_KEY);
          if (color === 'black') {
            localStorage.setItem(COLOR_THEME_KEY, 'blue');
            applyColorTheme('blue');
          }
        }
        return next;
      }),
    []
  );

  // Gaze-sync: when activeIndex changes, try to nudge Spline robot gaze
  useEffect(() => {
    try {
      if (!splineRef.current) return;
      if (activeIndex !== null) {
        splineRef.current.emitEvent?.('mouseDown', 'gazeTarget');
      }
    } catch (_) {
      // Graceful degradation — Spline scene may not expose gazeTarget
    }
  }, [activeIndex]);

  const contextValue = useMemo(
    () => ({ splineRef, activeIndex, setActiveIndex, hoveredIndex, setHoveredIndex }),
    [activeIndex, hoveredIndex]
  );

  return (
    <CortexSplineContext.Provider value={contextValue}>
      <ReactLenis root>
        <Router>
          <div
            className="min-h-screen w-full overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground"
            style={{ position: 'relative' }}
          >
          {/* ── Fullscreen Spline background ── */}
          {/* pointer-events must remain ON so the Spline canvas receives mousemove for head tracking.
              The canvas is at z-0; all UI sits at z-[5]+, so clicks on UI elements are never lost. */}
          <motion.div
            className="fixed inset-0 w-screen h-screen z-0 cortex-spline"
            style={{ visibility: splineReady ? 'visible' : 'hidden' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: splineReady ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <Spline
              scene="/scene.splinecode"
              onLoad={(splineApp) => { splineRef.current = splineApp; setSplineReady(true); }}
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </motion.div>

          {/* ── Global edge glow (pulses on sidebar hover) ── */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-[5]"
            animate={{
              opacity: hoveredIndex !== null ? 1 : 0,
              boxShadow:
                hoveredIndex !== null
                  ? 'inset 0 0 80px rgba(0, 112, 243, 0.15)'
                  : 'inset 0 0 0px rgba(0, 112, 243, 0)',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />

          {/* ── Sidebar, routes, floating chat ── synchronized with Spline ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: splineReady ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            className="relative z-[10] w-full"
          >
            <HolographicSidebar />
            <FloatingCortex />
            <AnimatedRoutes />
            <SystemToast />
          </motion.div>
        </div>
        </Router>
      </ReactLenis>
    </CortexSplineContext.Provider>
  );
}

export default App;
