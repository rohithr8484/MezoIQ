import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMezoContracts } from '@/hooks/useMezoContracts';
import { Coins, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { ClaimDialog } from './ClaimDialog';

export const RewardsDashboard = () => {
  const { rewardBalance, isConnected } = useMezoContracts();
  const [showClaimDialog, setShowClaimDialog] = useState(false);

  const stats = [
    {
      label: 'Total Points',
      value: rewardBalance.points,
      icon: Coins,
      color: 'text-primary',
    },
    {
      label: 'Pending Rewards',
      value: `${rewardBalance.pending} MUSD`,
      icon: Clock,
      color: 'text-accent',
    },
    {
      label: 'Claimed',
      value: `${rewardBalance.claimed} MUSD`,
      icon: CheckCircle,
      color: 'text-muted-foreground',
    },
    {
      label: 'Current Balance',
      value: `${rewardBalance.musdBalance.toFixed(2)} MUSD`,
      icon: TrendingUp,
      color: 'text-primary',
    },
  ];

  if (!isConnected) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Connect your wallet to view rewards</p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {rewardBalance.pending > 0 && (
        <Card className="p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Ready to Claim</h3>
              <p className="text-sm text-muted-foreground">
                You have {rewardBalance.pending} MUSD available to claim
              </p>
            </div>
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => setShowClaimDialog(true)}
            >
              Claim Rewards
            </Button>
          </div>
        </Card>
      )}

      <ClaimDialog 
        open={showClaimDialog}
        onOpenChange={setShowClaimDialog}
        availableAmount={rewardBalance.pending}
      />
    </>
  );
};
