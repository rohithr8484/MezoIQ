import { WalletConnectButton } from './WalletConnectButton';
import { BoarWalletButton } from './BoarWalletButton';
import { PythPriceDisplay } from './PythPriceDisplay';
import { Coins, Zap, Trophy } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
      
      {/* Enhanced glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[150px] animate-pulse-glow [animation-delay:0.5s]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Icon with enhanced animation */}
          <div className="flex justify-center mb-6 animate-fade-in-down">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse-glow" />
              <div className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-full p-6 hover:border-primary/60 hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(255,117,24,0.3)]">
                <Coins className="w-16 h-16 text-primary animate-bounce-subtle" />
              </div>
            </div>
          </div>

          {/* Main heading with enhanced gradient */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-300% [text-shadow:0_0_30px_rgba(255,117,24,0.3)] animate-scale-in">
            Mezo IQ
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
            Earn Bitcoin rewards through gaming, social activities, and daily challenges. 
            Connect your wallet and start earning today.
          </p>

          {/* Features with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(255,117,24,0.2)] hover:-translate-y-2 transition-all duration-300 animate-fade-in-up [animation-delay:0.3s] opacity-0 [animation-fill-mode:forwards] group">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="font-semibold text-lg mb-2">Instant Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Earn Bitcoin instantly for completing tasks
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-secondary/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-2 transition-all duration-300 animate-fade-in-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards] group">
              <Trophy className="w-8 h-8 text-secondary mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="font-semibold text-lg mb-2">Daily Challenges</h3>
              <p className="text-sm text-muted-foreground">
                Complete challenges to unlock bonus rewards
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(255,117,24,0.2)] hover:-translate-y-2 transition-all duration-300 animate-fade-in-up [animation-delay:0.5s] opacity-0 [animation-fill-mode:forwards] group">
              <Coins className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="font-semibold text-lg mb-2">MUSD Integration</h3>
              <p className="text-sm text-muted-foreground">
                Powered by Mezo's stablecoin for seamless transactions
              </p>
            </div>
          </div>

          {/* Pyth Network Live Price with animation */}
          <div className="max-w-md mx-auto py-4 animate-scale-in [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
            <PythPriceDisplay />
          </div>

          {/* Wallet connection buttons with shimmer effect */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in [animation-delay:0.7s] opacity-0 [animation-fill-mode:forwards]">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
              <div className="relative">
                <WalletConnectButton />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
              <div className="relative">
                <BoarWalletButton />
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-4 animate-fade-in [animation-delay:0.8s] opacity-0 [animation-fill-mode:forwards]">
            Connect your wallet to start earning Bitcoin rewards
          </p>
        </div>
      </div>
    </div>
  );
};
