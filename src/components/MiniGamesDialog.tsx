import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gamepad2, Trophy, Zap, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MiniGamesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGamePlay: () => void;
}

const miniGames = [
  {
    id: '1',
    name: 'Words of Wonders',
    description: 'Word puzzle game to test your vocabulary',
    url: 'https://www.crazygames.com/game/words-of-wonders',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: '2',
    name: 'Hexellent',
    description: 'Hexagonal puzzle challenge',
    url: 'https://poki.com/en/g/hexellent',
    icon: Target,
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: '3',
    name: 'Shenzhen Mahjong',
    description: 'Classic Mahjong tile matching game',
    url: 'https://poki.com/en/g/shenzhen-mahjong',
    icon: Gamepad2,
    color: 'from-green-500 to-teal-500',
  },
  {
    id: '4',
    name: 'Merge and Double',
    description: 'Merge numbers to reach higher values',
    url: 'https://poki.com/en/g/merge-and-double',
    icon: Trophy,
    color: 'from-red-500 to-pink-500',
  },
];

export const MiniGamesDialog = ({ open, onOpenChange, onGamePlay }: MiniGamesDialogProps) => {
  const handlePlayGame = (gameName: string, gameUrl: string) => {
    // Track the game play
    onGamePlay();
    
    // Show success toast
    toast({
      title: '🎮 Game Win Recorded!',
      description: `Playing ${gameName}. Progress updated!`,
    });
    
    // Open game in new tab
    window.open(gameUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">🎮 Play Mini Games</DialogTitle>
          <DialogDescription>
            Choose a game to play and earn progress toward your Gaming Champion challenge
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {miniGames.map((game) => {
            const Icon = game.icon;
            return (
              <Card key={game.id} className="p-4 hover:shadow-lg transition-all duration-300">
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{game.name}</h3>
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                  </div>

                  <Button
                    onClick={() => handlePlayGame(game.name, game.url)}
                    className="w-full"
                    variant="gradient"
                  >
                    Play Now
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 Tip: Each game you play counts toward your Gaming Champion progress!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
