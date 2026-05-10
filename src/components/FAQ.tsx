'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '@/config/constants';

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, index, isOpen, onToggle }: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`border rounded-lg overflow-hidden transition-all duration-200
        ${isOpen
          ? 'border-purple-500/50 bg-purple-950/20'
          : 'border-neutral-800/60 bg-void-soft hover:border-neutral-700/60'
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left
          focus:outline-none focus:ring-1 focus:ring-purple-500/30 rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="font-mono text-sm font-medium text-neutral-200 pr-4">
          <span className="text-purple-800 mr-2 select-none">[{String(index + 1).padStart(2, '0')}]</span>
          {question}
        </span>
        <span
          className={`text-purple-500/70 text-lg shrink-0 transition-transform duration-300
            ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-purple-900/30 mb-4" />
              <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-void-soft">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-purple-700 tracking-widest mb-3 uppercase">
            {'>'} questions
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 glow-purple">
            FAQ
          </h2>
          <div className="mt-3 section-divider" />
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem
              key={idx}
              question={item.question}
              answer={item.answer}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => toggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
