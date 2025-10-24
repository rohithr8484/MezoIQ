import { PiggyBank, Zap, Globe } from 'lucide-react';

export const UseCases = () => {
  const useCases = [
    {
      icon: PiggyBank,
      title: 'High-Yield Savings',
      description:
        'Earn 4.5% APY on your MUSD savings with no minimum balance required. Your money works for you while staying accessible whenever you need it.',
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description:
        'Send money to friends, family, or businesses instantly with zero transaction fees. No delays, no hidden costs - just simple, fast payments.',
    },
    {
      icon: Globe,
      title: 'International Remittances',
      description:
        'Send money globally without high fees or long wait times. Help your loved ones anywhere in the world with affordable, instant transfers.',
    },
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Use Cases
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real financial services for everyday needs - no crypto knowledge required
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-lg bg-accent/50 flex items-center justify-center group-hover:bg-accent/70 transition-colors duration-300">
                  <useCase.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-xl">
                  {useCase.title}
                </h3>
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
