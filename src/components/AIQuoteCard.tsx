'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface AIQuoteCardProps {
  model: string;
  modelLabel: string;
  question: string;
  quote: string;
  hasScreenshot: boolean;
  screenshotSrc?: string;
  color: string;
  index: number;
}

export default function AIQuoteCard({
  model,
  modelLabel,
  question,
  quote,
  hasScreenshot,
  screenshotSrc,
  color,
  index,
}: AIQuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="screenshot-card relative border border-neutral-800/60 rounded-lg
        bg-void-soft hover:border-purple-500/40 transition-colors duration-300 group"
    >
      {/* Model color accent bar */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${color}60, ${color}20, transparent)` }}
      />

      <div className="p-5">
        {/* Model header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
          />
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            {model}
          </span>
        </div>

        {/* Question prompt */}
        <div className="mb-3 font-mono text-xs text-neutral-600 bg-void-mid/50 rounded px-3 py-2 border-l-2 border-neutral-800">
          <span className="text-purple-800 mr-1">user:</span>
          {question}
        </div>

        {/* Response area */}
        {hasScreenshot && screenshotSrc ? (
          <div className="rounded border border-neutral-800 screenshot-container">
            <Image
              src={screenshotSrc!}
              alt={`${model} response about octopus`}
              width={800}
              height={600}
              className="w-full h-auto block screenshot-img"
            />
          </div>
        ) : (
          <div className="relative">
            {/* Placeholder with quote text until screenshot is added */}
            <div
              className="rounded border border-dashed border-neutral-800 bg-void-mid/30 p-4
              group-hover:border-purple-900/40 transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs text-neutral-700 mt-0.5 shrink-0">
                  model:
                </span>
                <blockquote className="font-mono text-sm text-neutral-300 italic leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <div className="h-px flex-1 bg-neutral-800" />
                <span className="font-mono text-[10px] text-neutral-700 whitespace-nowrap">
                  [ replace with screenshot ]
                </span>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
