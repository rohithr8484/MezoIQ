import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useState, useEffect } from 'react';
import type { RewardBalance, GasEstimate } from '@/types/rewards';
import { useUserProgress } from './useUserProgress';
import { CONTRACT_ADDRESSES } from '@/contracts/addresses';
import { REWARDS_ABI, ERC20_ABI } from '@/contracts/abis';

export const useMezoContracts = () => {
  const { address, isConnected } = useAccount();
  const { progress, isEnrolled, enrollInRewards } = useUserProgress();
  const [rewardBalance, setRewardBalance] = useState<RewardBalance>({
    points: 0,
    pending: 0,
    claimed: 0,
    musdBalance: 0,
    tbtcBalance: 0,
  });

  // Read user rewards from contract
  const { data: contractRewards } = useReadContract({
    address: CONTRACT_ADDRESSES.REWARDS as `0x${string}`,
    abi: REWARDS_ABI,
    functionName: 'getUserRewards',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && CONTRACT_ADDRESSES.REWARDS !== '0x0000000000000000000000000000000000000000',
    },
  });

  // Read MUSD balance
  const { data: musdBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.MUSD as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && CONTRACT_ADDRESSES.MUSD !== '0x0000000000000000000000000000000000000000',
    },
  });

  // Read tBTC balance
  const { data: tbtcBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.TBTC as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && CONTRACT_ADDRESSES.TBTC !== '0x0000000000000000000000000000000000000000',
    },
  });

  // Sync rewards from contract or local progress
  useEffect(() => {
    if (isConnected) {
      if (contractRewards && Array.isArray(contractRewards)) {
        // Use on-chain data when available
        const [points, pendingMUSD, claimedMUSD, totalEarned] = contractRewards as [bigint, bigint, bigint, bigint, bigint];
        setRewardBalance(prev => ({
          ...prev,
          points: Number(points),
          pending: Number(formatEther(pendingMUSD)),
          claimed: Number(formatEther(claimedMUSD)),
        }));
      } else if (isEnrolled) {
        // Fall back to local progress only if enrolled
        setRewardBalance(prev => ({
          ...prev,
          points: progress.totalEarned,
          pending: progress.points,
        }));
      } else {
        // Not enrolled - show zeros
        setRewardBalance(prev => ({
          ...prev,
          points: 0,
          pending: 0,
        }));
      }
    } else {
      // Not connected - reset to zeros
      setRewardBalance({
        points: 0,
        pending: 0,
        claimed: 0,
        musdBalance: 0,
        tbtcBalance: 0,
      });
    }
  }, [contractRewards, progress, isConnected, isEnrolled]);

  // Update balances when contract data changes
  useEffect(() => {
    if (isConnected) {
      setRewardBalance(prev => ({
        ...prev,
        musdBalance: musdBalance ? Number(formatEther(musdBalance as bigint)) : prev.musdBalance,
        tbtcBalance: tbtcBalance ? Number(formatEther(tbtcBalance as bigint)) : prev.tbtcBalance,
      }));
    }
  }, [musdBalance, tbtcBalance, isConnected]);

  const { writeContract, writeContractAsync, isPending } = useWriteContract();

  const claimRewards = async (amount: number) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    if (!isEnrolled) {
      throw new Error('Not enrolled in rewards program');
    }

    // Check if contracts are deployed
    if (CONTRACT_ADDRESSES.REWARDS !== '0x0000000000000000000000000000000000000000') {
      // Use actual contract call
      try {
        const hash = await writeContractAsync({
          address: CONTRACT_ADDRESSES.REWARDS as `0x${string}`,
          abi: REWARDS_ABI,
          functionName: 'claimRewards',
        });
        return { hash };
      } catch (error) {
        console.error('Contract claim failed:', error);
        throw error;
      }
    }

    // Fallback to mock for development
    return new Promise((resolve) => {
      setTimeout(() => {
        setRewardBalance(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - amount),
          claimed: prev.claimed + amount,
          musdBalance: prev.musdBalance + amount,
        }));
        resolve({ hash: '0x' + Math.random().toString(36).substring(7) });
      }, 2000);
    });
  };

  const completeChallenge = async (challengeId: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    if (!isEnrolled) {
      throw new Error('Not enrolled in rewards program');
    }

    if (CONTRACT_ADDRESSES.REWARDS !== '0x0000000000000000000000000000000000000000') {
      try {
        const hash = await writeContractAsync({
          address: CONTRACT_ADDRESSES.REWARDS as `0x${string}`,
          abi: REWARDS_ABI,
          functionName: 'completeChallenge',
          args: [challengeId],
        });
        return { hash };
      } catch (error) {
        console.error('Challenge completion failed:', error);
        throw error;
      }
    }

    // Mock for development
    return { hash: '0x' + Math.random().toString(36).substring(7) };
  };

  const estimateGas = async (amount: number): Promise<GasEstimate> => {
    // Gas estimation for Mezo network
    return {
      gasPrice: '0.000001',
      gasLimit: '150000',
      estimatedCost: '0.00015',
      slippage: 0.5,
    };
  };

  const swapMUSDToTBTC = async (amount: number) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    // Mock swap - replace with actual DEX contract when available
    return new Promise((resolve) => {
      setTimeout(() => {
        setRewardBalance(prev => ({
          ...prev,
          musdBalance: prev.musdBalance - amount,
          tbtcBalance: prev.tbtcBalance + amount * 0.99,
        }));
        resolve({ hash: '0x' + Math.random().toString(36).substring(7) });
      }, 2000);
    });
  };

  return {
    rewardBalance,
    claimRewards,
    completeChallenge,
    estimateGas,
    swapMUSDToTBTC,
    isPending,
    isConnected,
    isEnrolled,
    enrollInRewards,
    contractAddresses: CONTRACT_ADDRESSES,
  };
};
