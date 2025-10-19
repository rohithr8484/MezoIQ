import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RewardsDashboard } from './RewardsDashboard';
import { ChallengesSection } from './ChallengesSection';
import { LeaderboardSection } from './LeaderboardSection';
import { ReferralSection } from './ReferralSection';
import { PythPriceDisplay } from './PythPriceDisplay';
import { Trophy, Target, Users, Share2 } from 'lucide-react';

export const RewardsHub = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="dashboard" className="gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="referral" className="gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Referral</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <RewardsDashboard />
        </TabsContent>

        <TabsContent value="challenges">
          <ChallengesSection />
        </TabsContent>

        <TabsContent value="leaderboard">
          <LeaderboardSection />
        </TabsContent>

        <TabsContent value="referral">
          <ReferralSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
