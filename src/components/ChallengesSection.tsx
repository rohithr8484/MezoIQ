import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useChallenges } from '@/hooks/useChallenges';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Users, Calendar, CheckCircle2, Gift, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { SocialShareDialog } from './SocialShareDialog';
import { MiniGamesDialog } from './MiniGamesDialog';
import { useMezoContracts } from '@/hooks/useMezoContracts';

const typeIcons = {
  gaming: Gamepad2,
  social: Users,
  daily: Calendar,
};

const typeColors = {
  gaming: 'bg-primary/10 text-primary',
  social: 'bg-accent/10 text-accent',
  daily: 'bg-secondary/10 text-secondary-foreground',
};

export const ChallengesSection = () => {
  const { challenges, completeChallenge, isEnrolled } = useChallenges();
  const { isConnected, enrollInRewards } = useMezoContracts();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [gamesDialogOpen, setGamesDialogOpen] = useState(false);
  const [pendingChallengeId, setPendingChallengeId] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      const result = enrollInRewards();
      if (result.success) {
        toast.success(`Welcome! You've received ${result.bonusPoints} MUSD welcome bonus! 🎉`);
      }
    } catch (error) {
      toast.error('Failed to enroll');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleComplete = (id: string, title: string) => {
    if (!isEnrolled) {
      toast.error('Please join the rewards program first');
      return;
    }

    // If it's the Gaming Champion challenge, open games dialog
    if (id === '2') {
      setPendingChallengeId(id);
      setGamesDialogOpen(true);
      return;
    }

    // If it's the Social Butterfly challenge, open share dialog
    if (id === '3') {
      setPendingChallengeId(id);
      setShareDialogOpen(true);
      return;
    }

    const result = completeChallenge(id);
    if (result.completed) {
      toast.success(`Challenge completed: ${title}! +${result.reward} points earned!`);
    } else {
      toast.info(`Progress updated for: ${title}`);
    }
  };

  const handleGamePlay = () => {
    if (pendingChallengeId) {
      const result = completeChallenge(pendingChallengeId);
      
      if (result.completed) {
        toast.success(`Challenge completed! +${result.reward} points earned! 🎉`);
      } else {
        toast.info('Progress updated! Keep playing! 🎮');
      }
    }
  };

  const handleShare = () => {
    if (pendingChallengeId) {
      const result = completeChallenge(pendingChallengeId);
      setShareDialogOpen(false);
      setPendingChallengeId(null);
      
      if (result.completed) {
        toast.success(`Challenge completed! +${result.reward} points earned! 🎉`);
      } else {
        toast.info('Progress updated! Keep sharing! 💪');
      }
    }
  };

  // Show enrollment prompt if connected but not enrolled
  if (isConnected && !isEnrolled) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Active Challenges</h2>
          <Badge variant="outline" className="text-sm">
            <Lock className="w-3 h-3 mr-1" />
            Locked
          </Badge>
        </div>

        <Card className="p-8 text-center glass-card border-primary/20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Join Rewards to Unlock Challenges</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Enroll in the rewards program to start completing challenges and earning MUSD. Get a 10 MUSD welcome bonus!
          </p>
          <Button onClick={handleEnroll} disabled={isEnrolling}>
            {isEnrolling ? 'Enrolling...' : 'Join Rewards Program'}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Active Challenges</h2>
        <Badge variant="outline" className="text-sm">
          {challenges.filter(c => !c.completed).length} Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {challenges.map((challenge) => {
          const Icon = typeIcons[challenge.type];
          const progress = (challenge.progress / challenge.target) * 100;

          return (
            <Card key={challenge.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${typeColors[challenge.type]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {challenge.description}
                    </p>
                  </div>
                </div>
                {challenge.completed && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Progress: {challenge.progress}/{challenge.target}
                    </span>
                    <span className="font-semibold text-primary">
                      +{challenge.reward} pts
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {challenge.expiresAt && !challenge.completed && (
                  <p className="text-xs text-muted-foreground">
                    Expires: {challenge.expiresAt.toLocaleDateString()}
                  </p>
                )}

                {!challenge.completed && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleComplete(challenge.id, challenge.title)}
                  >
                    Complete Challenge
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <MiniGamesDialog
        open={gamesDialogOpen}
        onOpenChange={setGamesDialogOpen}
        onGamePlay={handleGamePlay}
      />

      <SocialShareDialog 
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onShare={handleShare}
      />
    </div>
  );
};
