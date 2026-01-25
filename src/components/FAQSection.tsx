import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Shield, Coins, Zap, Users } from 'lucide-react';

const faqs = [
  {
    question: 'What is Mezo IQ?',
    answer:
      'Mezo IQ is an enterprise-grade rewards platform built on the Bitcoin-powered Mezo blockchain. It enables businesses to create and manage loyalty programs, gamified engagement systems, and incentive mechanisms using Bitcoin-based rewards.',
    icon: HelpCircle,
  },
  {
    question: 'How do I earn rewards?',
    answer:
      'You can earn rewards by completing challenges, participating in leaderboard competitions, referring friends, and making purchases through our marketplace. All rewards are paid in BTC or MUSD stablecoin.',
    icon: Coins,
  },
  {
    question: 'What wallets are supported?',
    answer:
      'We support multiple wallet options including MetaMask, WalletConnect-compatible wallets, and Bitcoin wallets through our Mezo Passport integration. Simply connect your preferred wallet to get started.',
    icon: Shield,
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes, Mezo IQ uses enterprise-grade security with non-custodial wallet integration. Your private keys remain under your control at all times. All transactions are secured by the Bitcoin network.',
    icon: Shield,
  },
  {
    question: 'What is MUSD?',
    answer:
      'MUSD is a stablecoin on the Mezo network pegged to the US Dollar. It provides price stability for transactions while maintaining the security benefits of the Bitcoin blockchain.',
    icon: Coins,
  },
  {
    question: 'How fast are transactions?',
    answer:
      'Transactions on Mezo are near-instant with low fees. Reward distributions, purchases, and transfers typically complete within seconds, providing a seamless user experience.',
    icon: Zap,
  },
  {
    question: 'Can I refer friends?',
    answer:
      'Yes! Our referral program rewards you for bringing new users to the platform. Share your unique referral link and earn a percentage of your referrals\' rewards.',
    icon: Users,
  },
  {
    question: 'What can I buy with my rewards?',
    answer:
      'Our marketplace offers a variety of products and services that can be purchased with MUSD. All purchases earn additional cashback rewards, creating a virtuous cycle of earning.',
    icon: Coins,
  },
];

export const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-card/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-20 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            <HelpCircle className="w-4 h-4 inline mr-2" />
            FAQ
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.1s' }}>
            Everything you need to know about Mezo IQ
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card rounded-xl md:rounded-2xl border-none overflow-hidden animate-fade-in-up px-4 md:px-6"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AccordionTrigger className="py-4 md:py-6 hover:no-underline group">
                <div className="flex items-center gap-3 md:gap-4 text-left">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <faq.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-sm md:text-base lg:text-lg text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 md:pb-6 pl-11 md:pl-14 pr-2 md:pr-4">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-10 md:mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 max-w-xl mx-auto">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Our support team is here to help you get started
            </p>
            <a
              href="mailto:support@mezoiq.com"
              className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm md:text-base"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
