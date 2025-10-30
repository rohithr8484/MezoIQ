import { useEffect } from 'react';
import { useBitcoinAccount } from '@mezo-org/passport';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const BitcoinAccountInfo = () => {
  const { btcAddress, btcBalance } = useBitcoinAccount();

  useEffect(() => {
    if (btcAddress) {
      console.log('BTC Address:', btcAddress);
      console.log('BTC Balance (satoshis):', btcBalance.total);
    }
  }, [btcAddress, btcBalance]);

  if (!btcAddress) {
    return null;
  }

  const formatBTCBalance = (satoshis: number) => {
    const btc = satoshis / 100000000;
    return btc.toFixed(8);
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bitcoin className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Bitcoin Account</CardTitle>
        </div>
        <CardDescription>Connected via Mezo Passport</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Address</span>
          </div>
          <div className="bg-background/50 rounded-lg p-3 font-mono text-sm break-all">
            {btcAddress}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Total</span>
            <div className="font-semibold">
              {formatBTCBalance(btcBalance.total)} BTC
            </div>
            <Badge variant="outline" className="text-xs">
              {btcBalance.total.toLocaleString()} sats
            </Badge>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Confirmed</span>
            <div className="font-semibold">
              {formatBTCBalance(btcBalance.confirmed)} BTC
            </div>
            <Badge variant="secondary" className="text-xs">
              {btcBalance.confirmed.toLocaleString()} sats
            </Badge>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Unconfirmed</span>
            <div className="font-semibold">
              {formatBTCBalance(btcBalance.unconfirmed)} BTC
            </div>
            <Badge variant="outline" className="text-xs">
              {btcBalance.unconfirmed.toLocaleString()} sats
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
