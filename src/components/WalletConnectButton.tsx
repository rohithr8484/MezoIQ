import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export const WalletConnectButton = () => {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const walletConnectConnector = connectors.find(
      (connector) => connector.id === 'walletConnect'
    );
    
    if (walletConnectConnector) {
      connect(
        { connector: walletConnectConnector },
        {
          onSuccess: () => {
            toast.success('Wallet connected successfully!');
          },
          onError: (error) => {
            toast.error(`Failed to connect: ${error.message}`);
          },
        }
      );
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info('Wallet disconnected');
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
        {address.slice(0, 6)}...{address.slice(-4)}
        <LogOut className="w-4 h-4" />
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
      Connect with WalletConnect
    </Button>
  );
};
