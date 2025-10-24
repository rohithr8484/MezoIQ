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
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{useCase.emoji}</span>
                  <h3 className="font-semibold text-foreground text-xl">
                    {useCase.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
