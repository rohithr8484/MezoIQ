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
        <div className="animate-fade-in-down">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto backdrop-blur-sm bg-card/50 border border-border/50">
            <TabsTrigger 
              value="dashboard" 
              className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300 hover:scale-105"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="challenges" 
              className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300 hover:scale-105"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard" 
              className="gap-2 data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary transition-all duration-300 hover:scale-105"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="referral" 
              className="gap-2 data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary transition-all duration-300 hover:scale-105"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Referral</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
          <RewardsDashboard />
        </TabsContent>

        <TabsContent value="challenges" className="animate-fade-in">
          <ChallengesSection />
        </TabsContent>

        <TabsContent value="leaderboard" className="animate-fade-in">
          <LeaderboardSection />
        </TabsContent>

        <TabsContent value="referral" className="animate-fade-in">
          <ReferralSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
