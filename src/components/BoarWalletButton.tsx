import { Button } from '@/components/ui/button';
import { Wallet, Check } from 'lucide-react';
import { useMezoWallet } from '@/hooks/useMezoWallet';

export const BoarWalletButton = () => {
  const { isConnected, address, connect, disconnect } = useMezoWallet();

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        size="lg"
        onClick={disconnect}
        className="gap-3 border-accent/30 hover:border-accent"
      >
        <Check className="w-4 h-4 text-accent" />
        <span className="text-foreground">Mezo: {address.slice(0, 6)}...{address.slice(-4)}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={connect}
      className="gap-3 border-accent/30 hover:border-accent hover:bg-accent/10"
    >
      <Wallet className="w-5 h-5 text-accent" />
      <span>Boar Wallet</span>
    </Button>
  );
};
