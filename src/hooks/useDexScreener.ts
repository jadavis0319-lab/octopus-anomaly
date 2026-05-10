'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchTokenData, TokenData } from '@/lib/dexscreener';
import { SITE_CONFIG } from '@/config/constants';

interface UseDexScreenerResult {
  data: TokenData | null;
  loading: boolean;
  error: boolean;
  lastUpdated: Date | null;
}

// Polls DexScreener every 30 seconds for fresh price data
export function useDexScreener(): UseDexScreenerResult {
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    const result = await fetchTokenData(SITE_CONFIG.contractAddress);
    if (result) {
      setData(result);
      setError(false);
      setLastUpdated(new Date());
    } else {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, [load]);

  return { data, loading, error, lastUpdated };
}
