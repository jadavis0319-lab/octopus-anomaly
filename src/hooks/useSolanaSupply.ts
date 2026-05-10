'use client';

import { useState, useEffect, useCallback } from 'react';
import { SITE_CONFIG } from '@/config/constants';

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';

export interface SolanaSupplyResult {
  supply: number | null;
  loading: boolean;
  error: boolean;
}

function withTimeout(promise: Promise<Response>, ms: number): Promise<Response> {
  return Promise.race([
    promise,
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms)
    ),
  ]);
}

// Primary: derive from DexScreener marketCap / priceUsd (no CORS issues)
async function fetchViaDexScreener(address: string): Promise<number | null> {
  console.log('[supply] Trying DexScreener...');
  const res = await withTimeout(
    fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`),
    8000
  );
  if (!res.ok) return null;
  const json = await res.json();
  const pair = json?.pairs?.[0];
  if (!pair?.marketCap || !pair?.priceUsd) return null;
  const supply = Math.round(pair.marketCap / parseFloat(pair.priceUsd));
  console.log('[supply] DexScreener derived supply:', supply);
  return supply;
}

// Fallback 1: Solana JSON-RPC getTokenSupply
async function fetchViaRPC(address: string): Promise<number | null> {
  console.log('[supply] Trying Solana RPC...');
  const res = await withTimeout(
    fetch(SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenSupply',
        params: [address],
      }),
    }),
    8000
  );
  if (!res.ok) return null;
  const json = await res.json();
  const value = json?.result?.value;
  if (!value?.amount) return null;
  const decimals: number = value.decimals ?? 6;
  const supply = Math.round(Number(value.amount) / Math.pow(10, decimals));
  console.log('[supply] RPC supply:', supply);
  return supply;
}

// Fallback 2: Solscan public API
async function fetchViaSolscan(address: string): Promise<number | null> {
  console.log('[supply] Trying Solscan...');
  const res = await withTimeout(
    fetch(`https://api.solscan.io/v2/token/meta?token=${address}`, {
      headers: { Accept: 'application/json' },
    }),
    8000
  );
  if (!res.ok) return null;
  const json = await res.json();
  const data = json?.data ?? json;
  const rawSupply = data?.supply ?? data?.totalSupply;
  const decimals: number = data?.decimals ?? 6;
  if (rawSupply == null) return null;
  const supply = Math.round(Number(rawSupply) / Math.pow(10, decimals));
  console.log('[supply] Solscan supply:', supply);
  return supply;
}

export function useSolanaSupply(): SolanaSupplyResult {
  const [supply, setSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      console.log('[supply] Fetching token supply...');

      let result = await fetchViaDexScreener(SITE_CONFIG.contractAddress);

      if (result === null) {
        result = await fetchViaRPC(SITE_CONFIG.contractAddress);
      }

      if (result === null) {
        result = await fetchViaSolscan(SITE_CONFIG.contractAddress);
      }

      if (result !== null) {
        console.log('[supply] Supply loaded:', result);
        setSupply(result);
        setError(false);
      } else {
        console.log('[supply] All sources failed');
        setError(true);
      }
    } catch (e) {
      console.log('[supply] Unexpected error:', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, [load]);

  return { supply, loading, error };
}
