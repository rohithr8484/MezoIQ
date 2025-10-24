import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePurchases } from '@/hooks/usePurchases';
import { ShoppingBag, TrendingUp, Award, Coins } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const PurchasesDashboard = () => {
  const { stats } = usePurchases();

  if (stats.totalPurchases === 0) {
    return null;
  }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Your Purchase Dashboard
          </h2>
          <p className="text-muted-foreground">Track your spending and rewards</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Purchases</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalPurchases}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all hover:shadow-glow group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent (MUSD)</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalSpentMUSD.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                <Coins className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent (BTC)</p>
                <p className="text-2xl font-bold text-foreground">₿{stats.totalSpentBTC.toFixed(6)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all hover:shadow-glow-secondary group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Award className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rewards</p>
                <p className="text-2xl font-bold text-primary">{stats.totalRewardsMUSD.toFixed(4)} MUSD</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Purchase History */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Recent Purchases
          </h3>
          <div className="space-y-4">
            {stats.purchases.slice(0, 5).map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/30 hover:border-primary/30 transition-all group"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {purchase.productName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(purchase.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="font-mono">
                    {purchase.amountPaid.toFixed(purchase.token === 'BTC' ? 8 : 4)} {purchase.token}
                  </Badge>
                  <p className="text-xs text-primary font-semibold">
                    +{purchase.cashbackMUSD.toFixed(4)} MUSD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
