'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG, LINKS } from '@/config/constants';

const NAV_LINKS = [
  { label: 'Anomaly', href: '#anomaly' },
  { label: 'Buy', href: '#buy' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Community', href: '#community' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-purple-900/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-purple-400 hover:text-purple-300 transition-colors text-sm tracking-wider glow-purple"
            onClick={closeMenu}
          >
            ◈ {SITE_CONFIG.ticker}
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-neutral-400 hover:text-purple-300 transition-colors tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href={LINKS.pumpFun}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-4 py-2 border border-purple-500/50 text-purple-400
                hover:bg-purple-950/50 hover:border-purple-400 hover:text-purple-300
                transition-all duration-200 rounded tracking-wider uppercase glow-box-purple"
            >
              Buy $OCTOPUS
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden text-purple-400 hover:text-purple-300 p-1"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-6 bg-current transition-transform duration-200 ${
                  menuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              />
              <span
                className={`block h-px w-6 bg-current transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-6 bg-current transition-transform duration-200 ${
                  menuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-purple-900/30 bg-black/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="font-mono text-sm text-neutral-400 hover:text-purple-300 transition-colors py-3 min-h-[44px] flex items-center"
                >
                  <span className="text-purple-700 mr-2">›</span>
                  {link.label}
                </a>
              ))}
              <a
                href={LINKS.pumpFun}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="font-mono text-sm px-4 py-3 border border-purple-500/50 text-purple-400
                  text-center rounded mt-2 hover:bg-purple-950/50 transition-all min-h-[44px] flex items-center justify-center"
              >
                Buy $OCTOPUS
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
