'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  short?: boolean; // Show shortened address (first 6 … last 4)
}

function shorten(str: string): string {
  if (str.length <= 12) return str;
  return `${str.slice(0, 6)}...${str.slice(-4)}`;
}

export default function CopyButton({
  text,
  label,
  className = '',
  short = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const displayText = label ?? (short ? shorten(text) : text);

  return (
    <button
      onClick={handleCopy}
      className={`group relative inline-flex items-center gap-2 font-mono text-sm px-3 py-2
        border border-purple-500/30 rounded
        bg-void-soft hover:bg-purple-950/40
        text-purple-400 hover:text-purple-300
        transition-all duration-200
        hover:border-purple-500/60
        focus:outline-none focus:ring-1 focus:ring-purple-500/50
        ${className}`}
      title={`Copy: ${text}`}
      aria-label={copied ? 'Copied!' : `Copy ${label ?? 'address'}`}
    >
      <span className="truncate max-w-[260px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
        {displayText}
      </span>

      <span className="flex-shrink-0 transition-all duration-200">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-purple-300"
            >
              ✓
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-purple-500/60 group-hover:text-purple-400"
            >
              ⎘
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {copied && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: -28 }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full text-xs text-purple-300 whitespace-nowrap pointer-events-none"
        >
          Copied!
        </motion.span>
      )}
    </button>
  );
}
