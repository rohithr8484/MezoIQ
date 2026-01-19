import { WalletConnectButton } from './WalletConnectButton';
import { BoarWalletButton } from './BoarWalletButton';
import { ValidationCloudService } from './ValidationCloudService';
import { AnimatedBackground } from './AnimatedBackground';
import { Coins, Zap, Trophy, Shield, Lock, Globe } from 'lucide-react';
import mezoIcon from '@/assets/mezo-icon.png';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onEnterApp?: () => void;
}

export const Hero = ({ onEnterApp }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 md:py-0">
      <AnimatedBackground />
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      
      {/* Enterprise floating glow effects - subtle and professional */}
      <div className="absolute top-20 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[100px] md:blur-[150px] animate-float" />
      <div className="absolute bottom-20 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/10 rounded-full blur-[100px] md:blur-[150px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Premium Logo */}
          <div className="flex justify-center mb-6 md:mb-8 animate-fade-in">
            <div className="relative group">
              <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl md:rounded-3xl blur-xl md:blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
              <div className="relative p-3 md:p-5 rounded-xl md:rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl group-hover:border-primary/30 transition-all duration-500">
                <img 
                  src={mezoIcon} 
                  alt="Mezo Network" 
                  className="w-16 h-16 md:w-28 md:h-28 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Hero Title - Clean and Professional */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold animate-fade-in-up leading-tight tracking-tight">
              <span className="gradient-text">
                Mezo IQ
              </span>
            </h1>
            <div className="h-1 w-16 md:w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full opacity-80" />
          </div>

          {/* Subtitle - Enterprise messaging */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up font-normal leading-relaxed px-4" style={{ animationDelay: '0.2s' }}>
            Enterprise-grade rewards platform on the{' '}
            <span className="font-semibold text-primary">
              Bitcoin-powered blockchain
            </span>
            . Secure, scalable, and designed for growth.
          </p>

          {/* Feature Cards - Enterprise Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 py-8 md:py-12 px-2">
            <div className="glass-card rounded-xl p-5 md:p-6 hover:border-primary/40 transition-all duration-300 animate-fade-in-up group card-hover" style={{ animationDelay: '0.3s' }}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-foreground">Instant Rewards</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Real-time Bitcoin rewards with enterprise-grade reliability
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-5 md:p-6 hover:border-primary/40 transition-all duration-300 animate-fade-in-up group card-hover" style={{ animationDelay: '0.4s' }}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-foreground">Gamified Engagement</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Challenges and leaderboards that drive user participation
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-5 md:p-6 hover:border-primary/40 transition-all duration-300 animate-fade-in-up group card-hover sm:col-span-2 md:col-span-1" style={{ animationDelay: '0.5s' }}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                <Coins className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-foreground">MUSD Integration</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Seamless stablecoin transactions on Mezo network
              </p>
            </div>
          </div>

          {/* CTA Buttons - Professional styling */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in-up pt-2 md:pt-4 px-4" style={{ animationDelay: '0.6s' }}>
            {onEnterApp && (
              <Button
                onClick={onEnterApp}
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
              >
                Enter App
              </Button>
            )}
            <div className="w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
              <WalletConnectButton />
            </div>
            <div className="w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
              <BoarWalletButton />
            </div>
          </div>

          {/* Trust Badges - Enterprise credibility */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 pt-8 md:pt-12 animate-fade-in px-4" style={{ animationDelay: '0.7s' }}>
            {[
              { icon: Shield, label: 'Enterprise Security' },
              { icon: Lock, label: 'Non-Custodial' },
              { icon: Globe, label: 'Global Scale' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-card/50 border border-border/50 text-xs md:text-sm text-muted-foreground"
              >
                <Icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Cloud Integration */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-20 animate-fade-in-up px-2" style={{ animationDelay: '0.8s' }}>
          <ValidationCloudService />
        </div>
      </div>
    </div>
  );
};
