import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMezoContracts } from '@/hooks/useMezoContracts';
import { Bitcoin, TrendingUp, Clock, CheckCircle, Wallet, ShoppingBag, ArrowUpRight, ArrowDownRight, Gift, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ClaimDialog } from './ClaimDialog';
import { useChallenges } from '@/hooks/useChallenges';
import { usePurchases } from '@/hooks/usePurchases';
import { toast } from 'sonner';
import { PythPriceDisplay } from './PythPriceDisplay';
import { WalletConnectButton } from './WalletConnectButton';
import { format } from 'date-fns';

export const DashboardSection = () => {
  const { rewardBalance, isConnected, isEnrolled, enrollInRewards } = useMezoContracts();
  const { completeChallenge } = useChallenges();
  const { stats: purchaseStats } = usePurchases();
  const [showClaimDialog, setShowClaimDialog] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleClaimSuccess = () => {
    const result = completeChallenge('4');
    if (result.completed) {
      toast.success(`First Claim challenge completed! +${result.reward} points earned! 🎉`);
    }
  };

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      const result = enrollInRewards();
      if (result.success) {
        toast.success(`Welcome! You've received ${result.bonusPoints} MUSD welcome bonus! 🎉`);
      } else {
        toast.info('You are already enrolled in the rewards program');
      }
    } catch (error) {
      toast.error('Failed to enroll in rewards program');
    } finally {
      setIsEnrolling(false);
    }
  };

  const stats = [
    {
      label: 'Total Points',
      value: rewardBalance.points,
      icon: Bitcoin,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Pending Rewards',
      value: `${rewardBalance.pending} MUSD`,
      icon: Clock,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Claimed',
      value: `${rewardBalance.claimed} MUSD`,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      label: 'Current Balance',
      value: `${rewardBalance.musdBalance.toFixed(2)} MUSD`,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  if (!isConnected) {
    return (
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Dashboard</h1>
            <p className="text-muted-foreground">Track your rewards, purchases, and performance</p>
          </div>
          
          <Card className="p-8 md:p-12 text-center glass-card">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Connect your wallet to view your dashboard, track rewards, and manage your assets
            </p>
            <WalletConnectButton />
          </Card>
        </div>
      </section>
    );
  }

  // Show enrollment CTA if connected but not enrolled
  if (!isEnrolled) {
    return (
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Dashboard</h1>
            <p className="text-muted-foreground">Track your rewards, purchases, and performance</p>
          </div>
          
          <Card className="p-8 md:p-12 text-center glass-card border-primary/20">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-foreground">Join the Rewards Program</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start earning MUSD rewards by completing challenges, making purchases, and engaging with the platform. Get a <span className="text-primary font-semibold">10 MUSD welcome bonus</span> when you join!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-xl mx-auto">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Daily Challenges</p>
                <p className="text-xs text-muted-foreground">Earn up to 100 MUSD/day</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <ShoppingBag className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">2% Cashback</p>
                <p className="text-xs text-muted-foreground">On all purchases</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Leaderboard</p>
                <p className="text-xs text-muted-foreground">Compete for prizes</p>
              </div>
            </div>

            <Button 
              onClick={handleEnroll}
              disabled={isEnrolling}
              size="lg"
              className="px-8"
            >
              {isEnrolling ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Enrolling...
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5 mr-2" />
                  Join & Get 10 MUSD Bonus
                </>
              )}
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Your rewards and activity overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 md:p-6 glass-card hover:border-primary/30 transition-all duration-300 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Live Prices & Claim */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PythPriceDisplay />
          
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Claim Rewards</h3>
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Available to Claim</p>
                <p className="text-3xl font-bold text-primary">{rewardBalance.pending} MUSD</p>
              </div>
              
              <Button 
                onClick={() => setShowClaimDialog(true)}
                disabled={rewardBalance.pending === 0}
                className="w-full"
              >
                Claim Rewards
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 glass-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Purchases</h3>
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
          
          {purchaseStats.purchases.length > 0 ? (
            <div className="space-y-3">
              {purchaseStats.purchases.slice(0, 5).map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{purchase.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(purchase.timestamp), 'MMM d, yyyy • h:mm a')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                      <span className="font-medium">{purchase.amountPaid.toFixed(4)} {purchase.token}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <ArrowUpRight className="w-3 h-3" />
                      +{purchase.cashbackMUSD.toFixed(2)} MUSD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No purchases yet</p>
              <p className="text-sm text-muted-foreground/70">Visit the marketplace to start shopping</p>
            </div>
          )}
        </Card>
      </div>

      <ClaimDialog
        open={showClaimDialog}
        onOpenChange={setShowClaimDialog}
        availableAmount={rewardBalance.pending}
        onClaimSuccess={handleClaimSuccess}
      />
    </section>
  );
};
