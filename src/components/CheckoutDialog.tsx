import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, Wallet } from 'lucide-react';
import type { Product } from '@/types/product';
import { useProductPricing } from '@/hooks/useProductPricing';
import { usePurchases } from '@/hooks/usePurchases';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

interface CheckoutDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const CheckoutDialog = ({ product, open, onClose }: CheckoutDialogProps) => {
  const [selectedToken, setSelectedToken] = useState<'MUSD' | 'BTC'>('MUSD');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const { pricing, isLoading } = useProductPricing(product?.priceUSD || 0);
  const { addPurchase } = usePurchases();
  const { isConnected } = useAccount();

  const handlePurchase = async () => {
    if (!product || !isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsPurchasing(true);

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    const amountPaid = selectedToken === 'MUSD' ? pricing.musd : pricing.btc;
    const purchase = addPurchase(product.id, product.name, amountPaid, selectedToken);

    setIsPurchasing(false);
    setPurchaseComplete(true);

    toast.success(
      `Purchase successful! You earned ${purchase.cashbackMUSD.toFixed(4)} MUSD cashback!`,
      { duration: 5000 }
    );

    setTimeout(() => {
      setPurchaseComplete(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setPurchaseComplete(false);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl">Checkout</DialogTitle>
          <DialogDescription>
            Complete your purchase with MUSD or BTC via Boar Network
          </DialogDescription>
        </DialogHeader>

        {purchaseComplete ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
            <p className="text-xl font-semibold text-foreground">Purchase Complete!</p>
            <p className="text-sm text-muted-foreground">You earned 2% cashback in MUSD</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">{product.name}</h4>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            {!isConnected ? (
              <div className="flex flex-col items-center gap-4 py-6 px-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <Wallet className="w-12 h-12 text-destructive" />
                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Wallet Not Connected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Connect your wallet to Mezo Mainnet via Boar Network to complete this purchase
                  </p>
                  <p className="text-xs text-primary font-mono mt-2">
                    Network: Mezo Mainnet (Chain ID: 31612)
                  </p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Payment Token</Label>
                  <RadioGroup value={selectedToken} onValueChange={(v) => setSelectedToken(v as 'MUSD' | 'BTC')}>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="MUSD" id="musd" />
                      <Label htmlFor="musd" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">MUSD</span>
                          <span className="text-primary font-bold">
                            {pricing.musd.toFixed(4)} MUSD
                          </span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="BTC" id="btc" />
                      <Label htmlFor="btc" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Bitcoin (BTC)</span>
                          <span className="text-accent font-bold">
                            ₿{pricing.btc.toFixed(8)}
                          </span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cashback (2%)</span>
                    <span className="text-primary font-semibold">
                      {((selectedToken === 'MUSD' ? pricing.musd : pricing.btc) * 0.02).toFixed(4)} MUSD
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isPurchasing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${selectedToken === 'MUSD' ? pricing.musd.toFixed(4) : pricing.btc.toFixed(8)} ${selectedToken}`
                  )}
                </Button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
