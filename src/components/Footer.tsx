'use client';

import { motion } from 'framer-motion';
import { SITE_CONFIG, LINKS, FOOTER, SOCIAL_CARDS } from '@/config/constants';
import CopyButton from './CopyButton';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-purple-900/20">
      {/* Top glow line */}
      <div className="section-divider" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Logo + contract */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8"
        >
          <div>
            <div className="font-mono text-purple-400 glow-purple text-lg font-bold mb-1">
              ◈ {SITE_CONFIG.ticker}
            </div>
            <div className="font-mono text-xs text-neutral-700">
              {SITE_CONFIG.tagline}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-mono text-xs text-neutral-700 uppercase tracking-widest">
              Contract Address
            </div>
            <CopyButton
              text={SITE_CONFIG.contractAddress}
              short
              className="text-xs"
            />
          </div>
        </motion.div>

        {/* Social links row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-10"
        >
          {SOCIAL_CARDS.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-neutral-600 hover:text-purple-400
                transition-colors tracking-wider uppercase"
            >
              {card.label} ↗
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-neutral-900 mb-8" />

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6"
        >
          <p className="font-mono text-xs text-neutral-700 leading-relaxed border-l-2 border-neutral-800 pl-4">
            {FOOTER.disclaimer}
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-mono text-xs text-neutral-800">
            © {FOOTER.year} {SITE_CONFIG.ticker}
          </span>
          <span className="font-mono text-xs text-neutral-800">
            {FOOTER.credit}
          </span>
        </div>
      </div>
    </footer>
  );
}
