import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Check } from 'lucide-react';
import { useMezoWallet } from '@/hooks/useMezoWallet';

export const WalletConnectButton = () => {
  const { isConnected, address, connect, disconnect } = useMezoWallet();

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        size="lg"
        onClick={disconnect}
        className="gap-3 border-primary/30 hover:border-primary"
      >
        <Check className="w-4 h-4 text-accent" />
        <span className="text-foreground">{address.slice(0, 6)}...{address.slice(-4)}</span>
        <LogOut className="w-4 h-4 text-muted-foreground" />
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      size="lg"
      onClick={connect}
      className="gap-3"
    >
      <Wallet className="w-5 h-5" />
      Connect Wallet
    </Button>
  );
};
