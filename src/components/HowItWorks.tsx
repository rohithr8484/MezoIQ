import { Wallet, BadgeDollarSign, Send, TrendingUp, Activity } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Wallet,
      title: 'Connect Your Wallet',
      description: 'Simple setup - connect your wallet or create a new account in seconds',
    },
    {
      number: 2,
      icon: BadgeDollarSign,
      title: 'Add MUSD',
      description: 'Deposit MUSD to your account and start managing your finances',
    },
    {
      number: 3,
      icon: Send,
      title: 'Send or Receive Money',
      description: 'Transfer money instantly with zero fees to anyone, anywhere',
    },
    {
      number: 4,
      icon: TrendingUp,
      title: 'Earn 4.5% APY',
      description: 'Automatically earn interest on your savings with no minimum balance',
    },
    {
      number: 5,
      icon: Activity,
      title: 'Track Everything',
      description: 'Monitor all your transactions and savings growth in real-time',
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started with Mezo Sync - Simple financial services without the complexity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center text-secondary text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/50 flex items-center justify-center group-hover:bg-accent/70 transition-colors duration-300">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
