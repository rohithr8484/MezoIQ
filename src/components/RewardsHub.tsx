import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RewardsDashboard } from './RewardsDashboard';
import { ChallengesSection } from './ChallengesSection';
import { LeaderboardSection } from './LeaderboardSection';
import { ReferralSection } from './ReferralSection';
import { Trophy, Target, Users, Share2 } from 'lucide-react';

export const RewardsHub = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
          Rewards Hub
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground animate-fade-in-up">
          Your Dashboard
        </h2>
      </div>
      
      <Tabs defaultValue="dashboard" className="space-y-6 md:space-y-8">
        <div className="flex justify-center animate-fade-in-down overflow-x-auto pb-2">
          <TabsList className="inline-flex h-11 md:h-12 items-center justify-center rounded-lg md:rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 p-1 md:p-1.5 min-w-max">
            <TabsTrigger 
              value="dashboard" 
              className="gap-1.5 md:gap-2 rounded-md md:rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="challenges" 
              className="gap-1.5 md:gap-2 rounded-md md:rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard" 
              className="gap-1.5 md:gap-2 rounded-md md:rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline sm:inline">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="referral" 
              className="gap-1.5 md:gap-2 rounded-md md:rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline sm:inline">Referral</span>
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
