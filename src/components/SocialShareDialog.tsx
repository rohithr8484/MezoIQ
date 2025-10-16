import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Twitter, Send, Facebook, Link } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShare: () => void;
}

export const SocialShareDialog = ({ open, onOpenChange, onShare }: SocialShareDialogProps) => {
  const shareText = "I'm earning Bitcoin rewards on Bitcoin Rewards Hub! Join me and start earning MUSD today! 🚀";
  const shareUrl = window.location.origin;

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
    onShare();
    toast.success('Shared on Twitter!');
  };

  const handleTelegramShare = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank'
    );
    onShare();
    toast.success('Shared on Telegram!');
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
    onShare();
    toast.success('Shared on Facebook!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    onShare();
    toast.success('Link copied! Share it anywhere to earn progress.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share on Social Media</DialogTitle>
          <DialogDescription>
            Share on any platform to earn progress towards the Social Butterfly challenge
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleTwitterShare}
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleTelegramShare}
          >
            <Send className="w-4 h-4" />
            Telegram
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleFacebookShare}
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleCopyLink}
          >
            <Link className="w-4 h-4" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
