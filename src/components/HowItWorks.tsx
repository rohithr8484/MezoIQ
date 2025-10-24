import { Trophy, Gift, Network } from 'lucide-react';

export const HowItWorks = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Earn & Play on the Blockchain',
      description: 'Users can earn rewards, complete challenges, and climb the leaderboard on the Bitcoin-powered blockchain, making engagement fun, competitive, and rewarding.',
    },
    {
      icon: Gift,
      title: 'Programmable Rewards & Interactions',
      description: 'Apps can create custom incentives — Bitcoin-based loyalty programs, micro-rewards for actions, or creator payouts — turning everyday actions into meaningful rewards.',
    },
    {
      icon: Network,
      title: 'Cross-App Interoperability',
      description: 'Users can move their Bitcoin earnings, rewards, or in-app assets across supported platforms, creating a unified Bitcoin-powered digital economy.',
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ⚙️ How It Works Mezo IQ
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            how it works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-lg bg-accent/50 flex items-center justify-center group-hover:bg-accent/70 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-xl">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
