// DexScreener API types and fetcher
// All data fetching is client-side — this runs in the browser only.

export interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    h24: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    m5: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

export interface DexScreenerResponse {
  pairs: DexPair[] | null;
}

export interface TokenData {
  priceUsd: string;
  marketCap: number;
  fdv: number;
  volume24h: number;
  liquidity: number;
  priceChange24h: number;
  priceChange1h: number;
  dexUrl: string;
}

export async function fetchTokenData(tokenAddress: string): Promise<TokenData | null> {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) return null;

    const data: DexScreenerResponse = await res.json();
    if (!data.pairs || data.pairs.length === 0) return null;

    // Pick the pair with highest liquidity (most reliable price source)
    const pair = data.pairs.reduce((best, current) =>
      (current.liquidity?.usd ?? 0) > (best.liquidity?.usd ?? 0) ? current : best
    );

    return {
      priceUsd: pair.priceUsd ?? '0',
      marketCap: pair.marketCap ?? pair.fdv ?? 0,
      fdv: pair.fdv ?? 0,
      volume24h: pair.volume?.h24 ?? 0,
      liquidity: pair.liquidity?.usd ?? 0,
      priceChange24h: pair.priceChange?.h24 ?? 0,
      priceChange1h: pair.priceChange?.h1 ?? 0,
      dexUrl: pair.url ?? '',
    };
  } catch {
    return null;
  }
}

// Formatting helpers
export function formatUsd(value: number, compact = true): string {
  if (compact) {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPrice(priceUsd: string): string {
  const num = parseFloat(priceUsd);
  if (isNaN(num) || num === 0) return '$0.000000';
  if (num < 0.000001) return `$${num.toExponential(2)}`;
  if (num < 0.01) return `$${num.toFixed(8)}`;
  if (num < 1) return `$${num.toFixed(6)}`;
  return `$${num.toFixed(4)}`;
}

export function formatPriceChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}
