import { Badge } from '@/components/ui/badge';
import { Network, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAccount, useChainId } from 'wagmi';
import { mezoMainnet } from '@/config/wagmi';

export const NetworkBadge = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === mezoMainnet.id;

  if (!isConnected) {
    return (
      <Badge variant="outline" className="gap-2 border-muted-foreground/30">
        <AlertCircle className="w-3 h-3" />
        <span className="text-xs">Not Connected</span>
      </Badge>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <Badge variant="destructive" className="gap-2 animate-pulse">
        <AlertCircle className="w-3 h-3" />
        <span className="text-xs">Wrong Network</span>
      </Badge>
    );
  }

  return (
    <Badge className="gap-2 bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20">
      <CheckCircle2 className="w-3 h-3" />
      <span className="text-xs">Mezo Mainnet</span>
    </Badge>
  );
};
