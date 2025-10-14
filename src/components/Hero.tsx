import { WalletConnectButton } from './WalletConnectButton';
import { BoarWalletButton } from './BoarWalletButton';
import { Coins, Zap, Trophy } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50" />
      
      {/* Glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50" />
              <div className="relative bg-card border-2 border-primary/30 rounded-full p-6">
                <Coins className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
            Bitcoin Rewards Hub
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Earn Bitcoin rewards through gaming, social activities, and daily challenges. 
            Connect your wallet and start earning today.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Instant Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Earn Bitcoin instantly for completing tasks
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 hover:border-secondary/50 transition-all duration-300">
              <Trophy className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Daily Challenges</h3>
              <p className="text-sm text-muted-foreground">
                Complete challenges to unlock bonus rewards
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <Coins className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">MUSD Integration</h3>
              <p className="text-sm text-muted-foreground">
                Powered by Mezo's stablecoin for seamless transactions
              </p>
            </div>
          </div>

          {/* Wallet connection buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <WalletConnectButton />
            <BoarWalletButton />
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Connect your wallet to start earning Bitcoin rewards
          </p>
        </div>
      </div>
    </div>
  );
};
