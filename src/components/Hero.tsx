'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SITE_CONFIG, LINKS } from '@/config/constants';
import AsciiOctopus from './AsciiOctopus';
import PriceTicker from './PriceTicker';

// ParticleField uses canvas — load client-side only to avoid SSR mismatch
const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

export default function Hero() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(SITE_CONFIG.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Binary rain background */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Radial gradient vignette — focuses attention on center */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 70%, #000 100%)',
        }}
      />

      {/* Grid overlay — subtle depth */}
      <div className="absolute inset-0 z-10 bg-grid opacity-30" />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-6xl mx-auto py-24">

        {/* ASCII Octopus — the centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8 md:mb-10"
        >
          <AsciiOctopus size="hero" />
        </motion.div>

        {/* Tagline with glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-3"
        >
          <h1 className="glitch-wrapper font-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-purple-400 glow-purple-strong">
              {SITE_CONFIG.tagline}
            </span>
            <span className="glitch-layer-1" aria-hidden="true">
              {SITE_CONFIG.tagline}
            </span>
            <span className="glitch-layer-2" aria-hidden="true">
              {SITE_CONFIG.tagline}
            </span>
          </h1>
        </motion.div>

        {/* Subtagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="font-mono text-sm sm:text-base md:text-lg text-neutral-400 mb-8 md:mb-10 max-w-xl"
        >
          {SITE_CONFIG.subtagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16"
        >
          <a
            href={LINKS.pumpFun}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3 font-mono text-sm font-semibold tracking-wider uppercase
              bg-purple-600 hover:bg-purple-500 text-white rounded
              transition-all duration-200
              shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]
              focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            Buy on Pump.fun
          </a>
          <a
            href="#anomaly"
            className="px-8 py-3 font-mono text-sm font-semibold tracking-wider uppercase
              border border-purple-500/50 text-purple-400 rounded
              hover:bg-purple-950/40 hover:border-purple-400 hover:text-purple-300
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            Read the Anomaly ↓
          </a>
        </motion.div>

        {/* Live price ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-full max-w-3xl border-t border-b border-purple-900/30 py-4
            bg-black/40 backdrop-blur-sm rounded px-4"
        >
          <PriceTicker />
        </motion.div>

        {/* Contract address — click to copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-4"
        >
          <button
            onClick={handleCopy}
            className="group font-mono text-[10px] text-neutral-600 flex items-center gap-2
              hover:text-neutral-400 transition-colors cursor-pointer"
          >
            <span className="text-purple-800">CA:</span>
            <span className="text-neutral-700 truncate max-w-[200px] sm:max-w-none group-hover:text-neutral-500 transition-colors">
              {SITE_CONFIG.contractAddress}
            </span>
            <span className={`shrink-0 transition-colors ${copied ? 'text-emerald-400' : 'text-neutral-800 opacity-0 group-hover:opacity-100'}`}>
              {copied ? 'Copied!' : '⎘'}
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-1 text-purple-800 text-xs font-mono">
          <span>scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
