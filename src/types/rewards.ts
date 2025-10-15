export interface RewardBalance {
  points: number;
  pending: number;
  claimed: number;
  musdBalance: number;
  tbtcBalance: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'daily' | 'gaming' | 'social';
  progress: number;
  target: number;
  completed: boolean;
  expiresAt?: Date;
}

export interface ClaimTransaction {
  id: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  points: number;
  rewards: number;
}

export interface GasEstimate {
  gasPrice: string;
  gasLimit: string;
  estimatedCost: string;
  slippage: number;
}
