
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background py-8 relative overflow-hidden">
      <div className="container relative z-10 flex flex-col items-center justify-center space-y-6">
        
        {/* Brand */}
        <div className="text-lg font-bold tracking-widest text-slateText">
          CORTEX
        </div>

        {/* Navigation */}
        <nav className="flex flex-row flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs">
          <Link
            to="/features"
            className="text-slateMuted hover:text-primary hover:underline underline-offset-4 transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            to="/blog"
            className="text-slateMuted hover:text-primary hover:underline underline-offset-4 transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            to="/trust"
            className="text-slateMuted hover:text-primary hover:underline underline-offset-4 transition-colors duration-200"
          >
            Trust
          </Link>
          <Link
            to="/contact"
            className="text-slateMuted hover:text-primary hover:underline underline-offset-4 transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Divider with EKG pulse */}
        <div className="flex justify-center">
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

        {/* Bottom: Copyright */}
        <div className="pt-1 text-[11px] text-slateMuted/80 tracking-wide text-center">
          © Cortex - Agentic AI for Medical Clinics
        </div>

      </div>
    </footer>
  );
};

export default Footer;
