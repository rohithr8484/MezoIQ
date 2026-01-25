import { Trophy, Gift, Network, ArrowRight } from 'lucide-react';
import earnImage from '@/assets/how-it-works-earn.png';
import rewardsImage from '@/assets/how-it-works-rewards.png';
import platformImage from '@/assets/how-it-works-platform.png';

export const HowItWorks = () => {
  const features = [
    {
      icon: Trophy,
      step: '01',
      title: 'Earn & Engage',
      description: 'Complete challenges, climb leaderboards, and earn rewards on a Bitcoin-powered blockchain platform designed for maximum engagement.',
      image: earnImage,
    },
    {
      icon: Gift,
      step: '02',
      title: 'Programmable Rewards',
      description: 'Create custom incentive programs with Bitcoin-based loyalty rewards, micro-payments, and creator payouts that scale with your business.',
      image: rewardsImage,
    },
    {
      icon: Network,
      step: '03',
      title: 'Cross-Platform Ready',
      description: 'Move assets seamlessly across supported platforms with full interoperability, creating a unified Bitcoin-powered digital economy.',
      image: platformImage,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-background relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-20 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-[100px] md:blur-[150px]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up text-foreground">
            Built for Enterprise Scale
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.1s' }}>
            Three simple steps to integrate Bitcoin rewards into your platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 group card-hover animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step indicator */}
              <div className="absolute top-4 md:top-6 right-4 md:right-6 text-3xl md:text-4xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors z-20">
                {feature.step}
              </div>
              
              {/* Image */}
              <div className="relative w-full h-32 md:h-40 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              
              <div className="space-y-3 md:space-y-4 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Connection arrow for desktop */}
              {index < features.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="w-6 h-6 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
