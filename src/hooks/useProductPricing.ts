import { useState, useEffect } from 'react';
import { getBTCPrice, getMUSDPrice, convertUSDToToken } from '@/utils/pythPriceOracles';
import type { ProductPricing } from '@/types/product';

export const useProductPricing = (priceUSD: number) => {
  const [pricing, setPricing] = useState<ProductPricing>({
    usd: priceUSD,
    musd: 0,
    btc: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [btcPrice, musdPrice] = await Promise.all([
          getBTCPrice(),
          getMUSDPrice(),
        ]);

        setPricing({
          usd: priceUSD,
          musd: convertUSDToToken(priceUSD, musdPrice.price),
          btc: convertUSDToToken(priceUSD, btcPrice.price),
        });
      } catch (err) {
        setError('Failed to fetch token prices');
        console.error('Pricing error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, [priceUSD]);

  return { pricing, isLoading, error };
};
