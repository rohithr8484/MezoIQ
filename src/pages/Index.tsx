import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { UseCases } from '@/components/UseCases';
import { RewardsHub } from '@/components/RewardsHub';
import { ProductCatalog } from '@/components/ProductCatalog';
import { PurchasesDashboard } from '@/components/PurchasesDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-primary/3 z-0" />
      
      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <UseCases />
        <ProductCatalog />
        <PurchasesDashboard />
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <RewardsHub />
        </div>
      </div>
    </div>
  );
};

export default Index;
