import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { getBTCPrice, type BTCPrice } from '@/utils/pythPrice';

export const PythPriceDisplay = () => {
  const [priceData, setPriceData] = useState<BTCPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);

  useEffect(() => {
    let previousPrice: number | null = null;

    const fetchPrice = async () => {
      try {
        const data = await getBTCPrice();
        setPriceData(data);
        setError(null);
        
        if (previousPrice !== null) {
          setPriceChange(data.price - previousPrice);
        }
        previousPrice = data.price;
      } catch (err) {
        setError('Failed to fetch price');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrice();
    // Update every 30 seconds (Pyth updates every 400ms but we don't need that frequency for display)
    const interval = setInterval(fetchPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 animate-pulse" />
            Live BTC Price
          </CardTitle>
          <CardDescription>Powered by Pyth Network Oracle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-8 bg-primary/20 rounded w-32"></div>
            <div className="h-4 bg-primary/10 rounded w-24"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !priceData) {
    return (
      <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5" />
            Live BTC Price
          </CardTitle>
          <CardDescription>Powered by Pyth Network Oracle</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error || 'Unable to load price'}</p>
        </CardContent>
      </Card>
    );
  }

  const isPriceUp = priceChange > 0;
  const isPriceDown = priceChange < 0;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Live BTC Price
          </CardTitle>
          <Badge variant="outline" className="gap-1 bg-background/50">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Live
          </Badge>
        </div>
        <CardDescription>Powered by Pyth Network Oracle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">
            ${priceData.price.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </span>
          {priceChange !== 0 && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPriceUp ? 'text-green-500' : isPriceDown ? 'text-red-500' : ''
            }`}>
              {isPriceUp && <TrendingUp className="h-4 w-4" />}
              {isPriceDown && <TrendingDown className="h-4 w-4" />}
              {isPriceUp && '+'}
              {priceChange.toFixed(2)}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Confidence: ±${priceData.confidence.toFixed(2)}
          </span>
          <span>
            Updated: {new Date(priceData.timestamp).toLocaleTimeString()}
          </span>
        </div>
        
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Real-time data from Pyth Network • Updates every 400ms
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
