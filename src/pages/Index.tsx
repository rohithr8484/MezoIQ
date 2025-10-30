import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { UseCases } from '@/components/UseCases';
import { RewardsHub } from '@/components/RewardsHub';
import { ProductCatalog } from '@/components/ProductCatalog';
import { PurchasesDashboard } from '@/components/PurchasesDashboard';
import { PassportDashboard } from '@/components/PassportDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 animate-fade-in relative overflow-hidden">
      {/* Animated particle background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-particle-float blur-sm" />
        <div className="absolute top-20 right-20 w-3 h-3 bg-secondary rounded-full animate-particle-float blur-sm" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary rounded-full animate-particle-float blur-sm" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-secondary rounded-full animate-particle-float blur-sm" style={{ animationDelay: '6s' }} />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-primary rounded-full animate-particle-float blur-sm" style={{ animationDelay: '8s' }} />
        <div className="absolute top-2/3 left-10 w-2 h-2 bg-secondary rounded-full animate-particle-float blur-sm" style={{ animationDelay: '10s' }} />
      </div>
      
      <div className="relative z-10">
        <Hero />
        <div className="container mx-auto px-4 py-16">
          <PassportDashboard />
        </div>
        <HowItWorks />
        <UseCases />
        <ProductCatalog />
        <PurchasesDashboard />
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
          <RewardsHub />
        </div>
      </div>
    </div>
  );
};

export default Index;
