import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Share2, Twitter, Send } from 'lucide-react';
import { toast } from 'sonner';

export const ReferralSection = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'BTC-REWARDS-X7F2K';
  const referralLink = `https://btc-rewards.app/ref/${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = `Join me on Bitcoin Rewards Hub and earn MUSD! Use my referral code: ${referralCode}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      '_blank'
    );
  };

  const shareOnTelegram = () => {
    const text = `Join me on Bitcoin Rewards Hub and earn MUSD!`;
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Share2 className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Refer & Earn</h2>
          <p className="text-sm text-muted-foreground">
            Get 100 points for each friend who joins
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="font-mono text-sm"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className="shrink-0"
          >
            {copied ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={shareOnTwitter}
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={shareOnTelegram}
          >
            <Send className="w-4 h-4" />
            Telegram
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Referrals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">1,200</p>
            <p className="text-xs text-muted-foreground">Points Earned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">300</p>
            <p className="text-xs text-muted-foreground">MUSD Claimed</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
