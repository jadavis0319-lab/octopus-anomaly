'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import TypingEffect from './TypingEffect';
import AIQuoteCard from './AIQuoteCard';
import { ANOMALY, AI_QUOTES, LINKS } from '@/config/constants';

// Each section reveals with a typing animation, gated by a shared "active" index.
// When one section finishes typing, the next one activates.

export default function Anomaly() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08, once: true });
  const [activeSection, setActiveSection] = useState(-1);

  // Trigger the typing chain once the section scrolls into view
  useEffect(() => {
    if (inView && activeSection === -1) {
      setActiveSection(0);
    }
  }, [inView, activeSection]);

  function handleSectionComplete(idx: number) {
    setActiveSection(idx + 1);
  }

  return (
    <section
      id="anomaly"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-void-soft"
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-purple-700 tracking-widest mb-3 uppercase">
            {ANOMALY.terminalPrefix}
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 glow-purple">
            The Anomaly
          </h2>
          <div className="mt-3 section-divider" />
        </motion.div>

        {/* Terminal window */}
        <div className="rounded-lg border border-purple-900/40 overflow-hidden glow-box-purple mb-16">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-void-mid border-b border-purple-900/30">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-900/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-900/60" />
              <span className="w-3 h-3 rounded-full bg-green-900/60" />
            </div>
            <span className="font-mono text-xs text-neutral-700 ml-2">anomaly.log</span>
          </div>

          {/* Terminal body */}
          <div className="bg-void/60 p-4 sm:p-6 md:p-8 space-y-8 min-h-[200px] overflow-x-hidden">
            {ANOMALY.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                {/* Section heading — appears instantly once its turn comes */}
                {activeSection >= idx && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs text-purple-700 tracking-widest uppercase mb-1"
                  >
                    <span className="text-purple-900 mr-1">{'>'}</span>
                    {section.heading}
                  </motion.div>
                )}

                {/* Typing body text */}
                <div className="font-mono text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                  {activeSection >= idx && (
                    <TypingEffect
                      text={section.body}
                      speed={12}
                      active={activeSection === idx}
                      showCursor={activeSection === idx}
                      onComplete={() => handleSectionComplete(idx)}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Sam Altman catalyst — appears after all sections */}
            {activeSection >= ANOMALY.sections.length && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-4 border-l-2 border-purple-600 pl-4 py-1"
              >
                <span className="font-mono text-xs text-purple-600 tracking-wider uppercase block mb-1">
                  Catalyst
                </span>
                <a
                  href={LINKS.samAltmanTweet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-lg text-purple-300 hover:text-purple-200 transition-colors glow-purple"
                >
                  {ANOMALY.catalyst}
                </a>
              </motion.div>
            )}

            {/* Closing line */}
            {activeSection >= ANOMALY.sections.length && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-mono text-base sm:text-lg text-purple-400 glow-purple font-semibold"
              >
                {ANOMALY.closingLine}
              </motion.p>
            )}
          </div>
        </div>

        {/* AI Quote cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <h3 className="font-mono text-sm text-neutral-500 uppercase tracking-widest mb-6">
            <span className="text-purple-800 mr-2">{'>'}</span>
            The models speak
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AI_QUOTES.map((q, i) => (
              <AIQuoteCard key={q.model} {...q} index={i} />
            ))}
          </div>

          <p className="mt-4 font-mono text-xs text-neutral-700 text-center">
            + and many more...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
