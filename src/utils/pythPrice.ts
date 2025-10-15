const PYTH_API = 'https://hermes.pyth.network/api/latest_price_feeds';
const BTC_FEED_ID = '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b82c6d38c5e6b11d27f02b3';

export interface BTCPrice {
  price: number;
  timestamp: number;
  confidence: number;
}

export const getBTCPrice = async (): Promise<BTCPrice> => {
  try {
    const response = await fetch(`${PYTH_API}?ids[]=${BTC_FEED_ID}`);
    const data = await response.json();
    
    const priceData = data[0].price;
    const price = priceData.price / Math.pow(10, Math.abs(priceData.expo));
    const confidence = priceData.conf / Math.pow(10, Math.abs(priceData.expo));
    
    console.log(`₿ BTC Price: $${price.toFixed(2)}`);
    
    return {
      price,
      timestamp: Date.now(),
      confidence,
    };
  } catch (error) {
    console.error('Failed to fetch BTC price from Pyth:', error);
    throw error;
  }
};

export const formatBTCPrice = (price: number): string => {
  return `$${price.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};
