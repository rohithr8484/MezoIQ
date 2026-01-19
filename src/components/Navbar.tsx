import { useState } from 'react';
import { ShoppingBag, LayoutDashboard, Target, Users, Share2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import mezoIcon from '@/assets/mezo-icon.png';

export type NavSection = 'marketplace' | 'dashboard' | 'challenges' | 'leaderboard' | 'referral';

interface NavbarProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

const navItems: { id: NavSection; label: string; icon: React.ElementType }[] = [
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'challenges', label: 'Challenges', icon: Target },
  { id: 'leaderboard', label: 'Leaderboard', icon: Users },
  { id: 'referral', label: 'Referral', icon: Share2 },
];

export const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: NavSection) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => handleNavClick('marketplace')}>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative p-1.5 rounded-lg bg-card/80 border border-border/50">
                <img src={mezoIcon} alt="Mezo IQ" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:block">Mezo IQ</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'gap-2 px-4 py-2 transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'w-full justify-start gap-3 py-3',
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
