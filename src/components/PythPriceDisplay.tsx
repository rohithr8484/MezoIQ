import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, DollarSign, Bitcoin } from 'lucide-react';
import { getBTCPrice, getMUSDPrice, type TokenPrice } from '@/utils/pythPriceOracles';

interface PriceState {
  btc: TokenPrice | null;
  musd: TokenPrice | null;
}

interface PriceChanges {
  btc: number;
  musd: number;
}

export const PythPriceDisplay = () => {
  const [priceData, setPriceData] = useState<PriceState>({ btc: null, musd: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceChanges, setPriceChanges] = useState<PriceChanges>({ btc: 0, musd: 0 });

  useEffect(() => {
    let previousPrices = { btc: null as number | null, musd: null as number | null };
    let mounted = true;

    const fetchPrices = async () => {
      try {
        const [btcData, musdData] = await Promise.all([
          getBTCPrice(),
          getMUSDPrice(),
        ]);
        
        if (mounted) {
          setPriceData({ btc: btcData, musd: musdData });
          setError(null);
          setIsLoading(false);
          
          if (previousPrices.btc !== null) {
            setPriceChanges(prev => ({
              ...prev,
              btc: btcData.price - previousPrices.btc!,
            }));
          }
          if (previousPrices.musd !== null) {
            setPriceChanges(prev => ({
              ...prev,
              musd: musdData.price - previousPrices.musd!,
            }));
          }
          previousPrices = { btc: btcData.price, musd: musdData.price };
        }
      } catch (err) {
        console.error('Pyth price fetch error:', err);
        if (mounted) {
          setError('Unable to load prices');
          setIsLoading(false);
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 animate-pulse" />
            Live Token Prices
          </CardTitle>
          <CardDescription>Powered by Pyth Network Oracle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="space-y-2">
              <div className="h-6 bg-primary/20 rounded w-24"></div>
              <div className="h-8 bg-primary/20 rounded w-32"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-primary/20 rounded w-24"></div>
              <div className="h-8 bg-primary/20 rounded w-32"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || (!priceData.btc && !priceData.musd)) {
    return (
      <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5" />
            Live Token Prices
          </CardTitle>
          <CardDescription>Powered by Pyth Network Oracle</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error || 'Unable to load prices'}</p>
        </CardContent>
      </Card>
    );
  }

  const renderPriceCard = (
    token: 'btc' | 'musd',
    data: TokenPrice | null,
    change: number,
    icon: React.ReactNode,
    label: string
  ) => {
    if (!data) return null;
    
    const isPriceUp = change > 0;
    const isPriceDown = change < 0;
    const isMUSD = token === 'musd';
    
    return (
      <div className="p-3 rounded-lg bg-background/50 border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium text-sm">{label}</span>
          </div>
          {change !== 0 && (
            <div className={`flex items-center gap-1 text-xs font-medium ${
              isPriceUp ? 'text-green-500' : isPriceDown ? 'text-red-500' : ''
            }`}>
              {isPriceUp && <TrendingUp className="h-3 w-3" />}
              {isPriceDown && <TrendingDown className="h-3 w-3" />}
              {isPriceUp && '+'}
              {isMUSD ? change.toFixed(4) : change.toFixed(2)}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight">
            ${data.price.toLocaleString('en-US', { 
              minimumFractionDigits: isMUSD ? 4 : 2, 
              maximumFractionDigits: isMUSD ? 4 : 2 
            })}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>±${isMUSD ? data.confidence.toFixed(6) : data.confidence.toFixed(2)}</span>
          <span>{new Date(data.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Live Token Prices
          </CardTitle>
          <Badge variant="outline" className="gap-1 bg-background/50">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Live
          </Badge>
        </div>
        <CardDescription>Powered by Pyth Network Oracle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3">
          {renderPriceCard(
            'btc',
            priceData.btc,
            priceChanges.btc,
            <Bitcoin className="h-4 w-4 text-orange-500" />,
            'BTC/USD'
          )}
          {renderPriceCard(
            'musd',
            priceData.musd,
            priceChanges.musd,
            <DollarSign className="h-4 w-4 text-green-500" />,
            'MUSD/USD'
          )}
        </div>
        
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Real-time data from Pyth Network • Updates every 30s
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
