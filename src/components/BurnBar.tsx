'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '@/config/constants';

interface BurnBarProps {
  currentSupply: number | null;
  loading?: boolean;
  error?: boolean;
  priceUsd?: number | null;
}

function fmt(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(3)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function fmtUsd(value: number): string {
  if (value >= 1_000) return '$' + Math.round(value).toLocaleString();
  if (value >= 1) return '$' + Math.round(value).toString();
  return '$' + value.toFixed(2);
}

export default function BurnBar({ currentSupply, loading = false, error = false, priceUsd }: BurnBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Trigger fill animation on scroll-into-view, but only once data is ready
  useEffect(() => {
    if (loading || currentSupply === null) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, currentSupply]);

  const initial = SITE_CONFIG.initialSupply;

  // Guard: while loading or supply unknown, don't calculate burn
  if (loading || currentSupply === null) {
    return (
      <div ref={ref} className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          {(['Initial Supply', 'Burned', 'Circulating'] as const).map((label) => (
            <div key={label}>
              <div className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-1">
                {label}
              </div>
              {label === 'Initial Supply' ? (
                <div className="font-mono text-sm text-neutral-400">{fmt(initial)}</div>
              ) : (
                <div className="h-4 w-16 mx-auto bg-neutral-900 rounded animate-pulse" />
              )}
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between font-mono text-xs text-neutral-600 mb-1.5">
            <span>Burn progress</span>
            <span className="text-neutral-700">
              {error ? 'Supply data unavailable' : 'Loading...'}
            </span>
          </div>
          <div className="h-3 bg-void-mid rounded-full overflow-hidden border border-neutral-800">
            <div className="h-full w-0 burn-bar-fill rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const burned = Math.max(0, initial - currentSupply);
  const burnPct = Math.min(100, (burned / initial) * 100);
  const burnedUsd =
    priceUsd != null && priceUsd > 0 && burned > 0 ? burned * priceUsd : null;

  return (
    <div ref={ref} className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-1">
            Initial Supply
          </div>
          <div className="font-mono text-sm text-neutral-400">{fmt(initial)}</div>
        </div>
        <div>
          <div className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-1">
            Burned
          </div>
          <div className="font-mono text-sm text-amber-400">
            {burned > 0 ? fmt(burned) : '—'}
          </div>
          {burnedUsd !== null && (
            <>
              <div className="font-mono text-sm font-semibold text-purple-400 mt-1">
                {fmtUsd(burnedUsd)}
              </div>
              <div className="font-mono text-[10px] text-neutral-500 mt-0.5">
                at current market price
              </div>
            </>
          )}
        </div>
        <div>
          <div className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-1">
            Circulating
          </div>
          <div className="font-mono text-sm text-purple-300">{fmt(currentSupply)}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between font-mono text-xs text-neutral-600 mb-1.5">
          <span>Burn progress</span>
          <span className="text-amber-400 tabular-nums">{burnPct.toFixed(2)}% burned</span>
        </div>
        <div className="h-3 bg-void-mid rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full burn-bar-fill rounded-full"
            style={{ width: animated ? `${Math.max(burnPct, 0.5)}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
