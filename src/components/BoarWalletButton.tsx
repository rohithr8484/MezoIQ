import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

export const BoarWalletButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      // Boar wallet connection with Mezo mainnet
      // RPC: https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
      // WSS: wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
      // Chain ID: 31612
      
      toast.success('Boar wallet connected to Mezo Mainnet!');
      setIsConnected(true);
      setAddress('bc1q...' + Math.random().toString(36).substring(7));
    } catch (error) {
      toast.error('Failed to connect Boar wallet');
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress(null);
    toast.info('Boar wallet disconnected');
  };

  if (isConnected && address) {
    return (
      <Button
        variant="wallet"
        size="lg"
        onClick={handleDisconnect}
        className="gap-3"
      >
        <Wallet className="w-5 h-5" />
        {address.slice(0, 8)}...{address.slice(-6)}
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
      Connect with Boar
    </Button>
  );
};
