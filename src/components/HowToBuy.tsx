'use client';

import { motion } from 'framer-motion';
import { HOW_TO_BUY_STEPS, SITE_CONFIG } from '@/config/constants';
import CopyButton from './CopyButton';

export default function HowToBuy() {
  return (
    <section id="buy" className="relative py-24 md:py-32 bg-black">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-purple-700 tracking-widest mb-3 uppercase">
            {'>'} acquire
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 glow-purple">
            How to Buy
          </h2>
          <div className="mt-3 section-divider" />
        </motion.div>

        {/* Contract address — prominent placement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 p-5 border border-purple-900/50 rounded-lg bg-void-soft glow-box-purple"
        >
          <div className="font-mono text-xs text-purple-700 tracking-widest uppercase mb-2">
            Contract Address
          </div>
          <CopyButton
            text={SITE_CONFIG.contractAddress}
            label={SITE_CONFIG.contractAddress}
            className="w-full justify-between text-[10px] sm:text-xs md:text-sm"
          />
          <div className="mt-3 flex items-start gap-2 text-xs text-amber-600/80 font-mono">
            <span className="shrink-0 mt-0.5">⚠</span>
            <span>
              Always verify the contract address. Scam tokens copy our name. This is the only real CA.
            </span>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 md:space-y-8">
          {HOW_TO_BUY_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="flex gap-5 md:gap-8"
            >
              {/* Step number */}
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full
                  border border-purple-500/50 bg-void-soft shrink-0
                  font-mono text-base font-bold text-purple-400 glow-box-purple"
                >
                  {step.step}
                </div>
                {/* Connector line */}
                {idx < HOW_TO_BUY_STEPS.length - 1 && (
                  <div className="flex-1 w-px bg-gradient-to-b from-purple-700/40 to-transparent mt-2 min-h-[32px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <h3 className="font-mono text-lg font-semibold text-neutral-100 mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-neutral-400 leading-relaxed mb-4">
                  {step.description}
                </p>

                {step.note && (
                  <div className="mb-4 font-mono text-xs text-neutral-600 border-l border-purple-900/50 pl-3 py-0.5">
                    {step.note}
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {step.cta && step.href && (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-xs font-semibold
                        tracking-wider uppercase rounded w-full sm:w-auto min-h-[44px]
                        bg-purple-600 hover:bg-purple-500 text-white
                        shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]
                        transition-all duration-200"
                    >
                      {step.cta} ↗
                    </a>
                  )}

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
