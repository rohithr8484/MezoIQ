import { HermesClient } from '@pythnetwork/hermes-client';

const HERMES_ENDPOINT = 'https://hermes.pyth.network';

// Pyth Network Price Feed IDs
export const PRICE_FEED_IDS = {
  BTC_USD: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  MUSD_USD: '0x0617a9b725011a126a2b9fd53563f4236501f32cf76d877644b943394606c6de',
} as const;

export interface TokenPrice {
  price: number;
  timestamp: number;
  confidence: number;
}

export const getTokenPrice = async (feedId: string): Promise<TokenPrice> => {
  try {
    const connection = new HermesClient(HERMES_ENDPOINT, {});
    const priceUpdates = await connection.getLatestPriceUpdates([feedId]);
    
    if (!priceUpdates.parsed || priceUpdates.parsed.length === 0) {
      throw new Error('No price data available');
    }

    const priceData = priceUpdates.parsed[0].price;
    const price = Number(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = Number(priceData.conf) * Math.pow(10, priceData.expo);
    
    return {
      price,
      timestamp: Date.now(),
      confidence,
    };
  } catch (error) {
    console.error(`Failed to fetch price for feed ${feedId}:`, error);
    throw error;
  }
};

export const getBTCPrice = async (): Promise<TokenPrice> => {
  return getTokenPrice(PRICE_FEED_IDS.BTC_USD);
};

export const getMUSDPrice = async (): Promise<TokenPrice> => {
  return getTokenPrice(PRICE_FEED_IDS.MUSD_USD);
};

export const convertUSDToToken = (usdAmount: number, tokenPrice: number): number => {
  if (tokenPrice === 0) return 0;
  return usdAmount / tokenPrice;
};
