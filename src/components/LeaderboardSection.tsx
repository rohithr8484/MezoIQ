import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';
import type { LeaderboardEntry } from '@/types/rewards';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, address: '0x742d35...5d2f7a', points: 15420, rewards: 3840 },
  { rank: 2, address: '0x8f4a92...3c8e1b', points: 12350, rewards: 3087 },
  { rank: 3, address: '0x1a9c64...7f2d9e', points: 9870, rewards: 2467 },
  { rank: 4, address: '0x5e7b21...4a8c3f', points: 8590, rewards: 2147 },
  { rank: 5, address: '0x3d8f45...1b9e6c', points: 7320, rewards: 1830 },
  { rank: 6, address: '0x9c2a87...5f3d4e', points: 6150, rewards: 1537 },
  { rank: 7, address: '0x6b4e13...8a7c2d', points: 5480, rewards: 1370 },
  { rank: 8, address: '0x4f9a36...2c5e8b', points: 4790, rewards: 1197 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-700" />;
    default:
      return <span className="text-sm font-semibold text-muted-foreground">#{rank}</span>;
  }
};

export const LeaderboardSection = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Top Earners</h2>
        <Trophy className="w-6 h-6 text-primary" />
      </div>

      <div className="space-y-3">
        {MOCK_LEADERBOARD.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
              entry.rank <= 3
                ? 'bg-primary/5 border border-primary/10'
                : 'bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              
              <Avatar>
                <AvatarFallback>
                  {entry.address.slice(2, 4).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-mono text-sm font-medium">{entry.address}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.rewards} MUSD claimed
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-primary">{entry.points}</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
