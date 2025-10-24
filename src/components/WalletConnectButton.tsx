import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { useMezoWallet } from '@/hooks/useMezoWallet';

export const WalletConnectButton = () => {
  const { isConnected, address, connect, disconnect } = useMezoWallet();

  if (isConnected && address) {
    return (
      <Button
        variant="wallet"
        size="lg"
        onClick={disconnect}
        className="gap-3"
      >
        <Wallet className="w-5 h-5" />
        {address.slice(0, 6)}...{address.slice(-4)}
        <LogOut className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="wallet"
      size="lg"
      onClick={connect}
      className="gap-3"
    >
      <Wallet className="w-5 h-5" />
      Connect to Mezo
    </Button>
  );
};
