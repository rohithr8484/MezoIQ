import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MezoPassportButton } from './MezoPassportButton';
import { BitcoinAccountInfo } from './BitcoinAccountInfo';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Wallet, Link2 } from 'lucide-react';

export const PassportDashboard = () => {
  const { address, isConnected, connector } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Mezo Passport</CardTitle>
              <CardDescription>
                Connect Bitcoin & EVM wallets seamlessly
              </CardDescription>
            </div>
            <Badge variant={isConnected ? 'default' : 'outline'} className="h-fit">
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <MezoPassportButton />

          {isConnected && (
            <>
              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">Mezo Mainnet Account</h3>
                </div>

                <div className="space-y-3 bg-muted/50 rounded-lg p-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Connector</span>
                    <div className="font-medium">{connector?.name || 'Unknown'}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Address</span>
                    <div className="font-mono text-sm break-all">{address}</div>
                  </div>

                  {balance && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Balance</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">
                          {parseFloat(balance.formatted).toFixed(6)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {balance.symbol}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {isConnected && <BitcoinAccountInfo />}

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Supported Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Bitcoin Wallets</div>
                <div className="text-xs text-muted-foreground">
                  Unisat, OKX, Xverse
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">EVM Wallets</div>
                <div className="text-xs text-muted-foreground">
                  MetaMask, WalletConnect, Coinbase
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
