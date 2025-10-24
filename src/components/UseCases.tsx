import { Gamepad2, MessageSquare, ShoppingBag } from 'lucide-react';

export const UseCases = () => {
  const useCases = [
    {
      icon: Gamepad2,
      emoji: '🎮',
      title: 'Gaming',
      description:
        'Players earn Bitcoin for completing missions, winning tournaments, or contributing to community events. Developers monetize via microtransactions or in-game Bitcoin economies.',
    },
    {
      icon: MessageSquare,
      emoji: '💬',
      title: 'Social Platforms',
      description:
        'Reward content creators and community members with Bitcoin tips. Introduce engagement-based incentives — e.g., users earn Bitcoin for meaningful contributions or verified posts.',
    },
    {
      icon: ShoppingBag,
      emoji: '🛍️',
      title: 'E-Commerce',
      description:
        'Enable instant Bitcoin-based rewards or discounts for loyal customers. Gamify shopping experiences with challenges and achievement rewards.',
    },
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            💡 Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className="bg-card rounded-xl p-8 border border-border hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(56,139,253,0.3)] transition-all duration-500 animate-scale-in group transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 inline-block">{useCase.emoji}</span>
                  <h3 className="font-semibold text-foreground text-xl group-hover:text-secondary transition-colors duration-300">
                    {useCase.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {useCase.description}
                </p>
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
