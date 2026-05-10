'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;       // ms per character
  startDelay?: number;  // ms before typing begins
  active?: boolean;     // controlled by parent (e.g., IntersectionObserver)
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TypingEffect({
  text,
  speed = 18,
  startDelay = 0,
  active = true,
  className = '',
  showCursor = true,
  onComplete,
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!active) return;

    const delay = setTimeout(() => {
      function typeNext() {
        if (indexRef.current < text.length) {
          indexRef.current += 1;
          setDisplayed(text.slice(0, indexRef.current));
          timerRef.current = setTimeout(typeNext, speed);
        } else {
          setDone(true);
          onComplete?.();
        }
      }
      typeNext();
    }, startDelay);

    return () => {
      clearTimeout(delay);
      clearTimeout(timerRef.current);
    };
  }, [active, text, speed, startDelay, onComplete]);

  // Reset when text changes
  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && (
        <span className="terminal-cursor ml-0.5" aria-hidden="true" />
      )}
    </span>
  );
}
