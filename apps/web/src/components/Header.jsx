
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Stethoscope, Sun, Bot } from 'lucide-react';

const CORTEX_CHAT_URL = 'https://cortex-psi-eight.vercel.app/chat';

const Header = ({ theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('mobile-menu-open', isOpen);
    return () => document.documentElement.classList.remove('mobile-menu-open');
  }, [isOpen]);

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Blog', path: '/blog' },
    { name: 'Trust', path: '/trust' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container relative flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary-accent)', boxShadow: '0 10px 20px var(--cortex-glow)' }}
            >
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span
              className={`text-lg font-bold tracking-wider transition-all duration-300 ${
                isActive('/') ? 'text-glow-primary' : 'text-slateText'
              }`}
              style={{ color: 'var(--primary-accent)', textShadow: '0 0 10px var(--cortex-glow)' }}
            >
              CORTEX
            </span>
            <div className="flex sm:hidden items-center gap-2 ml-1">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/90 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.45)]" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">
                Live
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 ml-1">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/90 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.45)]" />
              </span>
              <span className="text-[11px] font-medium text-emerald-700/70">
                Agent Online
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation (visually centered) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-medium transition-all duration-300 ${
                isActive(link.path) 
                  ? 'text-primary text-glow-primary' 
                  : 'text-slateMuted hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 md:ml-4">
          {/* Theme toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-slateMuted hover:text-primary hover:bg-primaryBlueSoft dark:text-slate-200 dark:hover:text-white dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-slateMuted hover:text-primary hover:bg-primaryBlueSoft dark:text-slate-200 dark:hover:text-white dark:hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-background border-border/60">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? 'text-primary text-glow-primary'
                        : 'text-slateMuted hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Cortex: avatar + bubble below Contact (mobile only) */}
                <a
                  href={CORTEX_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 dark:bg-muted/20 p-3 mt-4 hover:bg-muted/50 transition-colors"
                  aria-label="Chat with Cortex"
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                    style={{ backgroundColor: 'var(--cortex-avatar-bg, #2563EB)' }}
                  >
                    <Bot className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground leading-snug">
                      Hi, I'm Cortex.
                    </p>
                    <p className="text-xs font-medium text-foreground/80 leading-snug">
                      Chat with me!
                    </p>
                  </div>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
