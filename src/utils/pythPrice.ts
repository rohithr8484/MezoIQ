import { HermesClient } from '@pythnetwork/hermes-client';

// Pyth Network Hermes endpoint
const HERMES_ENDPOINT = 'https://hermes.pyth.network';

// Correct BTC/USD price feed ID from Pyth Network
const BTC_FEED_ID = '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43';

// Pyth contract addresses on Mezo
export const PYTH_CONTRACTS = {
  mainnet: '0x2880aB155794e7179c9eE2e38200202908C17B43',
  testnet: '0x2880aB155794e7179c9eE2e38200202908C17B43',
} as const;

export interface BTCPrice {
  price: number;
  timestamp: number;
  confidence: number;
}

export const getBTCPrice = async (): Promise<BTCPrice> => {
  try {
    const connection = new HermesClient(HERMES_ENDPOINT, {});
    
    // Get latest price updates for BTC/USD
    const priceUpdates = await connection.getLatestPriceUpdates([BTC_FEED_ID]);
    
    if (!priceUpdates.parsed || priceUpdates.parsed.length === 0) {
      throw new Error('No price data available');
    }

    const priceData = priceUpdates.parsed[0].price;
    const price = Number(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = Number(priceData.conf) * Math.pow(10, priceData.expo);
    
    console.log(`₿ BTC Price: $${price.toFixed(2)} (via Pyth Network)`);
    
    return {
      price,
      timestamp: Date.now(),
      confidence,
    };
  } catch (error) {
    console.error('Failed to fetch BTC price from Pyth Network:', error);
    throw error;
  }
};

export const formatBTCPrice = (price: number): string => {
  return `$${price.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};
