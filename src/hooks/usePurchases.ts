import { useState, useEffect } from 'react';
import type { Purchase, PurchaseStats } from '@/types/product';

const STORAGE_KEY = 'mezo_purchases';
const CASHBACK_RATE = 0.02; // 2% cashback

export const usePurchases = () => {
  const [stats, setStats] = useState<PurchaseStats>({
    totalPurchases: 0,
    totalSpentMUSD: 0,
    totalSpentBTC: 0,
    totalRewardsMUSD: 0,
    purchases: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const purchases: Purchase[] = JSON.parse(stored);
      calculateStats(purchases);
    }
  }, []);

  const calculateStats = (purchases: Purchase[]) => {
    const totalSpentMUSD = purchases
      .filter(p => p.token === 'MUSD')
      .reduce((sum, p) => sum + p.amountPaid, 0);
    
    const totalSpentBTC = purchases
      .filter(p => p.token === 'BTC')
      .reduce((sum, p) => sum + p.amountPaid, 0);
    
    const totalRewardsMUSD = purchases.reduce((sum, p) => sum + p.cashbackMUSD, 0);

    setStats({
      totalPurchases: purchases.length,
      totalSpentMUSD,
      totalSpentBTC,
      totalRewardsMUSD,
      purchases,
    });
  };

  const addPurchase = (
    productId: string,
    productName: string,
    amountPaid: number,
    token: 'MUSD' | 'BTC'
  ) => {
    const cashbackMUSD = amountPaid * CASHBACK_RATE;
    
    const newPurchase: Purchase = {
      id: `purchase_${Date.now()}`,
      productId,
      productName,
      amountPaid,
      token,
      timestamp: new Date(),
      cashbackMUSD,
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const purchases: Purchase[] = stored ? JSON.parse(stored) : [];
    purchases.unshift(newPurchase);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
    calculateStats(purchases);

    return newPurchase;
  };

  return { stats, addPurchase };
};
