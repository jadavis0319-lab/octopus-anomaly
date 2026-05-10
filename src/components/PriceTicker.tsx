'use client';

import { useDexScreener } from '@/hooks/useDexScreener';
import { formatPrice, formatUsd } from '@/lib/dexscreener';
import { motion, AnimatePresence } from 'framer-motion';

export default function PriceTicker() {
  const { data, loading, error } = useDexScreener();


  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs sm:text-sm">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-purple-500/60"
          >
            <span className="animate-pulse">●</span>
            <span>Fetching price data...</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neutral-500 text-xs"
          >
            Price data unavailable
          </motion.div>
        ) : data ? (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <Stat label="PRICE" value={formatPrice(data.priceUsd)} />
            <Divider />
            <Stat label="MCAP" value={formatUsd(data.marketCap)} />
            <Divider />
            <Stat label="LIQ" value={formatUsd(data.liquidity)} />
            <Divider />
            <Stat label="VOL 24H" value={formatUsd(data.volume24h)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Stat({
  label,
  value,
  valueClassName = 'text-purple-300',
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-neutral-600 text-[10px] tracking-widest uppercase">{label}</span>
      <span className={`font-semibold ${valueClassName}`}>{value}</span>
    </div>
  );
}

function Divider() {
  return <span className="text-purple-900 select-none hidden sm:block">│</span>;
}
