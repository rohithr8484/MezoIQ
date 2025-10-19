import { Hero } from '@/components/Hero';
import { RewardsHub } from '@/components/RewardsHub';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 animate-fade-in">
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <RewardsHub />
      </div>
    </div>
  );
};

export default Index;
