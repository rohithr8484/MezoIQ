export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  priceUSD: number;
  category: 'hardware' | 'software' | 'service' | 'nft';
  collection?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ProductPricing {
  usd: number;
  musd: number;
  btc: number;
}

export interface Purchase {
  id: string;
  productId: string;
  productName: string;
  amountPaid: number;
  token: 'MUSD' | 'BTC';
  timestamp: Date;
  cashbackMUSD: number;
}

export interface PurchaseStats {
  totalPurchases: number;
  totalSpentMUSD: number;
  totalSpentBTC: number;
  totalRewardsMUSD: number;
  purchases: Purchase[];
}
