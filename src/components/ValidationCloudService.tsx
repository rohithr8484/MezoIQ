import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Blocks, Bitcoin } from 'lucide-react';

const VALIDATION_CLOUD_URL = 'https://mainnet.mezo.validationcloud.io/v1/bAhV9XJtsdARW9zbkmH_F0sUiVtbDlLry6plga8Xw1M';

interface BlockchainData {
  blockHeight: number;
  timestamp: number;
  isLive: boolean;
}

export const ValidationCloudService = () => {
  const [blockData, setBlockData] = useState<BlockchainData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockHeight = async () => {
    try {
      const response = await fetch(VALIDATION_CLOUD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_blockNumber',
          params: [],
        }),
      });

      const data = await response.json();
      
      if (data.result) {
        setBlockData({
          blockHeight: parseInt(data.result, 16),
          timestamp: Date.now(),
          isLive: true,
        });
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching block height:', err);
      setError('Failed to connect to blockchain');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockHeight();
    const interval = setInterval(fetchBlockHeight, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-card/50 to-card backdrop-blur-xl animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2">
            <Activity className="w-5 h-5 animate-pulse text-primary" />
            <span className="text-sm text-muted-foreground">Connecting to Mezo Network...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-card backdrop-blur-xl animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2 text-destructive">
            <Activity className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card/80 to-card backdrop-blur-xl hover:shadow-glow transition-all duration-500 animate-fade-in-up group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
              <Bitcoin className="w-5 h-5 text-primary animate-float" />
            </div>
            <div>
              <CardTitle className="text-lg">Bitcoin-Powered Network</CardTitle>
              <CardDescription>Mezo Mainnet via Validation Cloud</CardDescription>
            </div>
          </div>
          <Badge variant="default" className="gap-1.5 bg-primary/10 hover:bg-primary/20 border-primary/30 animate-pulse-glow">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300 group/card">
            <div className="flex items-center space-x-2 mb-2">
              <Blocks className="w-4 h-4 text-primary group-hover/card:scale-110 transition-transform" />
              <span className="text-sm text-muted-foreground">Current Block</span>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {blockData?.blockHeight.toLocaleString()}
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/10 hover:border-secondary/30 transition-all duration-300 group/card">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-secondary group-hover/card:scale-110 transition-transform" />
              <span className="text-sm text-muted-foreground">Network Status</span>
            </div>
            <p className="text-2xl font-bold text-green-500">
              Operational
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            🔗 Powered by Validation Cloud • Secured by Bitcoin • MUSD Ready
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
