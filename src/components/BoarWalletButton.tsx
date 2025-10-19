import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { useAccount, useSwitchChain } from 'wagmi';
import { mezoMainnet } from '@/config/wagmi';

export const BoarWalletButton = () => {
  const { address: wagmiAddress, isConnected: wagmiConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [isBoarWallet, setIsBoarWallet] = useState(false);

  useEffect(() => {
    // Check if connected via Boar wallet or on Mezo chain
    if (wagmiConnected && chainId === mezoMainnet.id) {
      setIsBoarWallet(true);
    }
  }, [wagmiConnected, chainId]);

  const handleConnect = async () => {
    try {
      // Switch to Mezo mainnet using Boar endpoints
      // RPC: https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
      // WSS: wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
      // Chain ID: 31612
      
      if (wagmiConnected && chainId !== mezoMainnet.id) {
        await switchChain({ chainId: mezoMainnet.id });
        toast.success('Switched to Mezo Mainnet!');
        setIsBoarWallet(true);
      } else {
        toast.info('Please connect a wallet first, then switch to Mezo Mainnet');
      }
    } catch (error) {
      toast.error('Failed to switch to Mezo Mainnet');
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    setIsBoarWallet(false);
    toast.info('Switched away from Mezo Mainnet');
  };

  if (isBoarWallet && wagmiAddress && chainId === mezoMainnet.id) {
    return (
      <Button
        variant="wallet"
        size="lg"
        onClick={handleDisconnect}
        className="gap-3"
      >
        <Wallet className="w-5 h-5" />
        Mezo: {wagmiAddress.slice(0, 6)}...{wagmiAddress.slice(-4)}
      </Button>
    );
  }

  return (
    <Button
      variant="wallet"
      size="lg"
      onClick={handleConnect}
      className="gap-3"
    >
      <Wallet className="w-5 h-5" />
      Switch to Mezo
    </Button>
  );
};
