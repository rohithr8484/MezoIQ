import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RewardsDashboard } from './RewardsDashboard';
import { ChallengesSection } from './ChallengesSection';
import { LeaderboardSection } from './LeaderboardSection';
import { ReferralSection } from './ReferralSection';
import { Trophy, Target, Users, Share2 } from 'lucide-react';

export const RewardsHub = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
          Rewards Hub
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in-up">
          Your Dashboard
        </h2>
      </div>
      
      <Tabs defaultValue="dashboard" className="space-y-8">
        <div className="flex justify-center animate-fade-in-down">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 p-1.5">
            <TabsTrigger 
              value="dashboard" 
              className="gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="challenges" 
              className="gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard" 
              className="gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="referral" 
              className="gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
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
