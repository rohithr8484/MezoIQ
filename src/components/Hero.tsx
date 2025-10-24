import { WalletConnectButton } from './WalletConnectButton';
import { BoarWalletButton } from './BoarWalletButton';
import { ValidationCloudService } from './ValidationCloudService';
import { Coins, Zap, Trophy } from 'lucide-react';
import mezoLogo from '@/assets/mezo-logo.png';
import mezoIcon from '@/assets/mezo-icon.png';

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
          {/* Premium Logo */}
          <div className="flex justify-center mb-8 animate-fade-in-down">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse-glow" />
              <div className="relative p-4 rounded-3xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 animate-float">
                <img 
                  src={mezoIcon} 
                  alt="Mezo Network" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Hero Title with enhanced gradient */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-up leading-tight tracking-tight">
              Mezo Network
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
          </div>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl text-foreground/90 max-w-3xl mx-auto animate-fade-in-up font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Earn rewards, complete challenges, and climb the leaderboard on the{' '}
            <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Bitcoin-powered blockchain
            </span>
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

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up pt-6" style={{ animationDelay: '0.4s' }}>
            <WalletConnectButton />
            <BoarWalletButton />
          </div>

          {/* Enhanced Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              { label: '₿ Bitcoin-Powered', color: 'primary' },
              { label: '🔒 Secure', color: 'secondary' },
              { label: '💎 Rewarding', color: 'accent' },
              { label: '🌐 Community-Driven', color: 'primary' }
            ].map(({ label, color }, index) => (
              <span
                key={label}
                className={`px-6 py-3 rounded-full bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl border-2 border-${color}/30 text-sm font-medium text-foreground/90 hover:border-${color}/60 hover:shadow-glow transition-all duration-500 hover:scale-110 cursor-default`}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Validation Cloud Integration */}
        <div className="max-w-4xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <ValidationCloudService />
        </div>
      </div>
    </div>
  );
};
