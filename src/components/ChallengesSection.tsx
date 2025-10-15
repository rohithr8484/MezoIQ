import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useChallenges } from '@/hooks/useChallenges';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Users, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

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
  const { challenges, completeChallenge } = useChallenges();

  const handleComplete = (id: string, title: string) => {
    const result = completeChallenge(id);
    if (result.completed) {
      toast.success(`Challenge completed: ${title}! +${result.reward} points earned!`);
    } else {
      toast.info(`Progress updated for: ${title}`);
    }
  };

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
    </div>
  );
};
