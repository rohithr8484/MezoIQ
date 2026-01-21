import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useState } from 'react';
import { CONTRACT_ADDRESSES } from '@/contracts/addresses';
import { MARKETPLACE_ABI, ERC20_ABI } from '@/contracts/abis';
import { toast } from 'sonner';

export const useMarketplaceContract = () => {
  const { address, isConnected } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const { writeContractAsync } = useWriteContract();

  // Read MUSD allowance for marketplace
  const { data: musdAllowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACT_ADDRESSES.MUSD as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESSES.MARKETPLACE as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && CONTRACT_ADDRESSES.MUSD !== '0x0000000000000000000000000000000000000000',
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

  const approveToken = async (tokenAddress: string, amount: bigint) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsApproving(true);
    try {
      const hash = await writeContractAsync({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.MARKETPLACE as `0x${string}`, amount],
      });
      
      toast.success('Token approval confirmed!');
      await refetchAllowance();
      return hash;
    } catch (error: any) {
      console.error('Approval failed:', error);
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  const purchaseWithMUSD = async (productId: string, amountMUSD: number) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const amount = parseEther(amountMUSD.toString());

    // Check balance
    if (musdBalance && (musdBalance as bigint) < amount) {
      throw new Error(`Insufficient MUSD balance. You have ${formatEther(musdBalance as bigint)} MUSD`);
    }

    setIsPurchasing(true);
    try {
      // Check and request approval if needed
      const currentAllowance = musdAllowance as bigint || BigInt(0);
      if (currentAllowance < amount) {
        toast.info('Approving MUSD for marketplace...');
        await approveToken(CONTRACT_ADDRESSES.MUSD, amount);
      }

      // Check if marketplace contract is deployed
      if (CONTRACT_ADDRESSES.MARKETPLACE !== '0x0000000000000000000000000000000000000000') {
        toast.info('Confirming purchase on blockchain...');
        const hash = await writeContractAsync({
          address: CONTRACT_ADDRESSES.MARKETPLACE as `0x${string}`,
          abi: MARKETPLACE_ABI,
          functionName: 'purchaseWithMUSD',
          args: [productId, amount],
        });
        return { hash, success: true };
      } else {
        // Simulate transfer for demo (contracts not deployed)
        toast.info('Simulating MUSD transfer...');
        // In production, this would fail gracefully
        // For now, we simulate success after approval
        await new Promise(resolve => setTimeout(resolve, 1500));
        return { hash: '0x' + Math.random().toString(36).substring(7), success: true };
      }
    } catch (error: any) {
      console.error('Purchase failed:', error);
      if (error.message?.includes('User rejected')) {
        throw new Error('Transaction cancelled by user');
      }
      throw error;
    } finally {
      setIsPurchasing(false);
    }
  };

  const purchaseWithBTC = async (productId: string, amountBTC: number) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    // BTC has 8 decimals, but tBTC on EVM is typically 18 decimals
    const amount = parseEther(amountBTC.toString());

    // Check balance
    if (tbtcBalance && (tbtcBalance as bigint) < amount) {
      throw new Error(`Insufficient tBTC balance. You have ${formatEther(tbtcBalance as bigint)} tBTC`);
    }

    setIsPurchasing(true);
    try {
      // Check and request approval if needed
      const { data: btcAllowance } = await useReadContract({
        address: CONTRACT_ADDRESSES.TBTC as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [address, CONTRACT_ADDRESSES.MARKETPLACE as `0x${string}`],
      });

      if ((btcAllowance as bigint || BigInt(0)) < amount) {
        toast.info('Approving tBTC for marketplace...');
        await approveToken(CONTRACT_ADDRESSES.TBTC, amount);
      }

      if (CONTRACT_ADDRESSES.MARKETPLACE !== '0x0000000000000000000000000000000000000000') {
        toast.info('Confirming purchase on blockchain...');
        const hash = await writeContractAsync({
          address: CONTRACT_ADDRESSES.MARKETPLACE as `0x${string}`,
          abi: MARKETPLACE_ABI,
          functionName: 'purchaseWithBTC',
          args: [productId, amount],
        });
        return { hash, success: true };
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return { hash: '0x' + Math.random().toString(36).substring(7), success: true };
      }
    } catch (error: any) {
      console.error('Purchase failed:', error);
      if (error.message?.includes('User rejected')) {
        throw new Error('Transaction cancelled by user');
      }
      throw error;
    } finally {
      setIsPurchasing(false);
    }
  };

  const createGiftCard = async (
    cardType: string,
    amount: number,
    senderName: string,
    receiverName: string,
    recipientAddress?: string
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const amountWei = parseEther(amount.toString());

    // Check balance
    if (musdBalance && (musdBalance as bigint) < amountWei) {
      throw new Error(`Insufficient MUSD balance. You have ${formatEther(musdBalance as bigint)} MUSD`);
    }

    setIsPurchasing(true);
    try {
      // Check and request approval
      const currentAllowance = musdAllowance as bigint || BigInt(0);
      if (currentAllowance < amountWei) {
        toast.info('Approving MUSD for gift card...');
        await approveToken(CONTRACT_ADDRESSES.MUSD, amountWei);
      }

      const recipient = recipientAddress || address; // Default to self if no recipient

      if (CONTRACT_ADDRESSES.MARKETPLACE !== '0x0000000000000000000000000000000000000000') {
        toast.info('Creating gift card on blockchain...');
        const hash = await writeContractAsync({
          address: CONTRACT_ADDRESSES.MARKETPLACE as `0x${string}`,
          abi: MARKETPLACE_ABI,
          functionName: 'createGiftCard',
          args: [cardType, amountWei, senderName, receiverName, recipient as `0x${string}`],
        });
        return { hash, success: true };
      } else {
        // Simulate for demo
        toast.info('Processing gift card purchase...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        return { hash: '0x' + Math.random().toString(36).substring(7), success: true };
      }
    } catch (error: any) {
      console.error('Gift card creation failed:', error);
      if (error.message?.includes('User rejected')) {
        throw new Error('Transaction cancelled by user');
      }
      throw error;
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    purchaseWithMUSD,
    purchaseWithBTC,
    createGiftCard,
    approveToken,
    isApproving,
    isPurchasing,
    isConnected,
    musdBalance: musdBalance ? Number(formatEther(musdBalance as bigint)) : 0,
    tbtcBalance: tbtcBalance ? Number(formatEther(tbtcBalance as bigint)) : 0,
    musdAllowance: musdAllowance ? Number(formatEther(musdAllowance as bigint)) : 0,
  };
};
