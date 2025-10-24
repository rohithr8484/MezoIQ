import { WalletConnectButton } from './WalletConnectButton';
import { BoarWalletButton } from './BoarWalletButton';
import { ValidationCloudService } from './ValidationCloudService';
import { Coins, Zap, Trophy } from 'lucide-react';
import mezoLogo from '@/assets/mezo-logo.png';
import mezoIcon from '@/assets/mezo-icon.png';

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient with motion */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5 animate-gradient bg-300%" style={{ backgroundSize: '200% 200%' }} />
      
      {/* Enhanced floating glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-float [animation-delay:2s] [animation-duration:4s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[150px] animate-pulse-glow [animation-delay:0.5s]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Premium Logo with enhanced glow */}
          <div className="flex justify-center mb-8 animate-fade-in-down">
            <div className="relative group animate-bounce-subtle">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse-glow" style={{ backgroundSize: '200% 200%' }} />
              <div className="relative p-4 rounded-3xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 animate-float group-hover:scale-110">
                <img 
                  src={mezoIcon} 
                  alt="Mezo Network" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Hero Title with animated gradient */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in-up leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-300%" style={{ backgroundSize: '200% 200%' }}>
                Mezo IQ
              </span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary via-secondary to-primary animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          </div>

          {/* Subtitle with shimmer effect */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up font-normal leading-relaxed relative" style={{ animationDelay: '0.2s' }}>
            <span className="relative inline-block">
              Earn rewards, complete challenges, and climb the leaderboard on the{' '}
              <span className="font-semibold text-primary">
                Bitcoin-powered blockchain
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer pointer-events-none" style={{ backgroundSize: '200% 100%' }} />
            </span>
          </p>

          {/* Features with enhanced staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(255,117,24,0.4)] hover:-translate-y-3 hover:scale-105 transition-all duration-500 animate-fade-in-up [animation-delay:0.3s] opacity-0 [animation-fill-mode:forwards] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 relative z-10 group-hover:drop-shadow-[0_0_10px_rgba(255,117,24,0.8)]" />
              <h3 className="font-semibold text-lg mb-2 relative z-10">Instant Rewards</h3>
              <p className="text-sm text-muted-foreground relative z-10">
                Earn Bitcoin instantly for completing tasks
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-secondary/60 hover:shadow-[0_0_40px_rgba(56,139,253,0.4)] hover:-translate-y-3 hover:scale-105 transition-all duration-500 animate-fade-in-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Trophy className="w-8 h-8 text-secondary mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 relative z-10 group-hover:drop-shadow-[0_0_10px_rgba(56,139,253,0.8)]" />
              <h3 className="font-semibold text-lg mb-2 relative z-10">Daily Challenges</h3>
              <p className="text-sm text-muted-foreground relative z-10">
                Complete challenges to unlock bonus rewards
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(255,117,24,0.4)] hover:-translate-y-3 hover:scale-105 transition-all duration-500 animate-fade-in-up [animation-delay:0.5s] opacity-0 [animation-fill-mode:forwards] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Coins className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 relative z-10 group-hover:drop-shadow-[0_0_10px_rgba(255,117,24,0.8)]" />
              <h3 className="font-semibold text-lg mb-2 relative z-10">MUSD Integration</h3>
              <p className="text-sm text-muted-foreground relative z-10">
                Powered by Mezo's stablecoin for seamless transactions
              </p>
            </div>
          </div>

          {/* Premium CTA Buttons with hover lift */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up pt-6" style={{ animationDelay: '0.4s' }}>
            <div className="transform hover:scale-110 hover:-translate-y-2 transition-all duration-300">
              <WalletConnectButton />
            </div>
            <div className="transform hover:scale-110 hover:-translate-y-2 transition-all duration-300">
              <BoarWalletButton />
            </div>
          </div>

          {/* Enhanced Feature badges with pulse */}
          <div className="flex flex-wrap justify-center gap-3 pt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              { label: '₿ Bitcoin-Powered', color: 'primary' },
              { label: '🔒 Secure', color: 'secondary' },
              { label: '💎 Rewarding', color: 'accent' },
              { label: '🌐 Community-Driven', color: 'primary' }
            ].map(({ label, color }, index) => (
              <span
                key={label}
                className={`px-6 py-3 rounded-full bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl border-2 border-${color}/30 text-sm font-medium text-foreground/90 hover:border-${color}/60 hover:shadow-glow transition-all duration-500 hover:scale-125 hover:-translate-y-1 cursor-default animate-fade-in-up opacity-0 [animation-fill-mode:forwards]`}
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
