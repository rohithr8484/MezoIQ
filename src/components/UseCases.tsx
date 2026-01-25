import { Gamepad2, MessageSquare, ShoppingBag, TrendingUp } from 'lucide-react';
import gamingImage from '@/assets/usecase-gaming.png';
import socialImage from '@/assets/usecase-social.png';
import ecommerceImage from '@/assets/usecase-ecommerce.png';

export const UseCases = () => {
  const useCases = [
    {
      icon: Gamepad2,
      title: 'Gaming & Entertainment',
      description:
        'Reward players with Bitcoin for completing missions, winning tournaments, or contributing to community events. Build sustainable in-game economies.',
      stats: '40% higher retention',
      image: gamingImage,
    },
    {
      icon: MessageSquare,
      title: 'Social Platforms',
      description:
        'Incentivize creators and community members with Bitcoin rewards. Drive engagement through verified contributions and quality content.',
      stats: '3x engagement boost',
      image: socialImage,
    },
    {
      icon: ShoppingBag,
      title: 'E-Commerce & Retail',
      description:
        'Deploy Bitcoin-based loyalty programs with instant rewards. Gamify shopping experiences with achievement-based incentives.',
      stats: '25% repeat purchases',
      image: ecommerceImage,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-card/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-20 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-accent/5 rounded-full blur-[100px] md:blur-[150px]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 animate-fade-in">
            Use Cases
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up text-foreground">
            Industry Solutions
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.1s' }}>
            Trusted by leading platforms across multiple industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-6 md:p-8 group card-hover animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image */}
              <div className="relative w-full h-32 md:h-40 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              
              <div className="space-y-4 md:space-y-5 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <useCase.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                
                <h3 className="font-semibold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {useCase.title}
                </h3>
                
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
                
                {/* Stats badge */}
                <div className="flex items-center gap-2 pt-1 md:pt-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-xs md:text-sm font-medium text-accent">{useCase.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
