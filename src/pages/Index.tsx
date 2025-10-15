import { Hero } from '@/components/Hero';
import { RewardsHub } from '@/components/RewardsHub';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Hero />
      <RewardsHub />
    </div>
  );
};

export default Index;
