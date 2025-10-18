import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMezoContracts } from '@/hooks/useMezoContracts';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';
import type { GasEstimate } from '@/types/rewards';

interface ClaimDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableAmount: number;
  onClaimSuccess?: () => void;
}

export const ClaimDialog = ({ open, onOpenChange, availableAmount, onClaimSuccess }: ClaimDialogProps) => {
  const { claimRewards, estimateGas, isPending } = useMezoContracts();
  const [amount, setAmount] = useState(availableAmount.toString());
  const [gasEstimate, setGasEstimate] = useState<GasEstimate | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);

  useEffect(() => {
    if (open) {
      setAmount(availableAmount.toString());
      handleEstimateGas(availableAmount);
    }
  }, [open, availableAmount]);

  const handleEstimateGas = async (value: number) => {
    if (value <= 0 || value > availableAmount) return;
    
    setIsEstimating(true);
    try {
      const estimate = await estimateGas(value);
      setGasEstimate(estimate);
    } catch (error) {
      console.error('Gas estimation failed:', error);
    } finally {
      setIsEstimating(false);
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleEstimateGas(numValue);
    }
  };

  const handleClaim = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0 || numAmount > availableAmount) {
      toast.error('Invalid amount');
      return;
    }

    try {
      await claimRewards(numAmount);
      toast.success(`Successfully claimed ${numAmount} MUSD!`);
      onClaimSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to claim rewards');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Claim MUSD Rewards</DialogTitle>
          <DialogDescription>
            Convert your points to MUSD tokens
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (MUSD)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              max={availableAmount}
              step="0.1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Available: {availableAmount} MUSD
            </p>
          </div>

          {gasEstimate && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gas Price:</span>
                <span className="font-medium">{gasEstimate.gasPrice} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Cost:</span>
                <span className="font-medium">{gasEstimate.estimatedCost} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Slippage:</span>
                <span className="font-medium">{gasEstimate.slippage}%</span>
              </div>
            </div>
          )}

          {isEstimating && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Estimating gas...
            </div>
          )}

          <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg">
            <AlertCircle className="w-4 h-4 text-accent mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Claiming will convert your points to MUSD tokens on the Mezo network. 
              Transaction fees apply.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              className="flex-1"
              onClick={handleClaim}
              disabled={isPending || isEstimating || !gasEstimate}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Claiming...
                </>
              ) : (
                'Confirm Claim'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
