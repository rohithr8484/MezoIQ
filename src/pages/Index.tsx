import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { UseCases } from '@/components/UseCases';
import { FAQSection } from '@/components/FAQSection';
import { Navbar, NavSection } from '@/components/Navbar';
import { MarketplaceSection } from '@/components/MarketplaceSection';
import { DashboardSection } from '@/components/DashboardSection';
import { ChallengesSection } from '@/components/ChallengesSection';
import { LeaderboardSection } from '@/components/LeaderboardSection';
import { ReferralSection } from '@/components/ReferralSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('marketplace');
  const [showLanding, setShowLanding] = useState(true);

  const handleSectionChange = (section: NavSection) => {
    setActiveSection(section);
    setShowLanding(false);
  };

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-primary/3 z-0" />
        
        <div className="relative z-10">
          <Hero onEnterApp={handleEnterApp} />
          <HowItWorks />
          <UseCases />
          <FAQSection />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-primary/3 z-0" />
      
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main className="relative z-10">
        {activeSection === 'marketplace' && <MarketplaceSection />}
        {activeSection === 'dashboard' && <DashboardSection />}
        {activeSection === 'challenges' && (
          <section className="py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Challenges</h1>
                <p className="text-muted-foreground">Complete challenges to earn bonus rewards</p>
              </div>
              <ChallengesSection />
            </div>
          </section>
        )}
        {activeSection === 'leaderboard' && (
          <section className="py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Leaderboard</h1>
                <p className="text-muted-foreground">See how you rank against other users</p>
              </div>
              <LeaderboardSection />
            </div>
          </section>
        )}
        {activeSection === 'referral' && (
          <section className="py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Referral Program</h1>
                <p className="text-muted-foreground">Invite friends and earn rewards together</p>
              </div>
              <ReferralSection />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
