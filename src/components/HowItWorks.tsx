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
    <section className="py-24 px-4 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-300%" style={{ backgroundSize: '200% 200%' }}>
              ⚙️ How It Works Mezo IQ
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl animate-pulse-glow -z-10" />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            how it works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,100,0,0.3)] transition-all duration-500 animate-fade-in-up group transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,100,0,0.4)]">
                  <feature.icon className="w-7 h-7 text-primary group-hover:animate-pulse" />
                </div>
                <h3 className="font-semibold text-foreground text-xl group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
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
