import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Sparkles, CreditCard, Users, ArrowRight } from 'lucide-react';
import { GiftCardDialog } from './GiftCardDialog';
import { cn } from '@/lib/utils';

const giftCardCategories = [
  {
    id: 'birthday',
    name: 'Birthday',
    emoji: '🎂',
    gradient: 'from-orange-400 via-pink-500 to-purple-600',
    popular: true,
  },
  {
    id: 'holidays',
    name: 'Holidays',
    emoji: '🎄',
    gradient: 'from-red-500 via-green-500 to-red-600',
    popular: false,
  },
  {
    id: 'thankyou',
    name: 'Thank You',
    emoji: '💝',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    popular: true,
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    emoji: '💍',
    gradient: 'from-purple-400 via-pink-500 to-red-500',
    popular: false,
  },
  {
    id: 'congrats',
    name: 'Congratulations',
    emoji: '🎉',
    gradient: 'from-blue-400 via-purple-500 to-pink-500',
    popular: false,
  },
  {
    id: 'general',
    name: 'Just Because',
    emoji: '✨',
    gradient: 'from-teal-400 via-blue-500 to-purple-600',
    popular: true,
  },
];

const features = [
  {
    icon: CreditCard,
    title: 'Pay with MUSD',
    description: 'Use your MUSD balance to purchase gift cards',
  },
  {
    icon: Sparkles,
    title: '2% Cashback',
    description: 'Earn rewards on every gift card purchase',
  },
  {
    icon: Users,
    title: 'Personalize',
    description: 'Add custom messages and recipient details',
  },
];

export const GiftCardsSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <Gift className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Gift Cards</h2>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          New
        </Badge>
      </div>

      {/* Featured Banner */}
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <Badge variant="secondary" className="mb-3">
                <Sparkles className="w-3 h-3 mr-1" />
                Earn 2% Cashback
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Send MUSD Gift Cards
              </h3>
              <p className="text-muted-foreground mb-4">
                The perfect gift for any occasion. Customize with themes, personal messages, and send instantly.
              </p>
              <Button size="lg" onClick={() => setDialogOpen(true)} className="gap-2">
                Create Gift Card
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Preview Cards Stack */}
            <div className="relative w-48 h-32 md:w-64 md:h-40">
              <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-xl opacity-60 rotate-6" />
              <div className="absolute top-2 left-2 w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl opacity-80 rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                <div className="text-white text-center">
                  <Gift className="w-8 h-8 mx-auto mb-2" />
                  <span className="font-bold">Mezo IQ</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="border-border/50">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gift Card Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {giftCardCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setDialogOpen(true)}
            className="group relative overflow-hidden rounded-xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
          >
            <div className={cn(
              'aspect-[4/3] bg-gradient-to-br flex items-center justify-center',
              category.gradient
            )}>
              <span className="text-4xl group-hover:scale-110 transition-transform">{category.emoji}</span>
            </div>
            <div className="p-3 bg-card">
              <p className="text-sm font-medium truncate">{category.name}</p>
              {category.popular && (
                <Badge variant="secondary" className="mt-1 text-xs">Popular</Badge>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Quick Amount Cards */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[10, 25, 50, 100, 250, 500].map((amount) => (
          <Button
            key={amount}
            variant="outline"
            onClick={() => setDialogOpen(true)}
            className="gap-1 hover:border-primary hover:bg-primary/5"
          >
            <Gift className="w-4 h-4" />
            {amount} MUSD
          </Button>
        ))}
      </div>

      <GiftCardDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
};
