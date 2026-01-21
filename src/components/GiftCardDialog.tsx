import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Gift, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GiftCardDialogProps {
  open: boolean;
  onClose: () => void;
}

type GiftCardType = {
  id: string;
  name: string;
  theme: string;
  gradient: string;
};

const giftCardTypes: GiftCardType[] = [
  { id: 'birthday', name: 'Happy Birthday', theme: '🎂', gradient: 'from-orange-400 via-pink-500 to-purple-600' },
  { id: 'holidays', name: 'Happy Holidays', theme: '🎄', gradient: 'from-red-500 via-green-500 to-red-600' },
  { id: 'thankyou', name: 'Thank You', theme: '💝', gradient: 'from-yellow-400 via-orange-500 to-red-500' },
  { id: 'anniversary', name: 'Happy Anniversary', theme: '💍', gradient: 'from-purple-400 via-pink-500 to-red-500' },
  { id: 'congrats', name: 'Congratulations', theme: '🎉', gradient: 'from-blue-400 via-purple-500 to-pink-500' },
  { id: 'general', name: 'Just Because', theme: '✨', gradient: 'from-teal-400 via-blue-500 to-purple-600' },
];

const presetAmounts = [1, 25, 50, 100];
const customAmounts = [250, 500, 1000];

type Step = 'type' | 'amount' | 'customize' | 'confirm';

export const GiftCardDialog = ({ open, onClose }: GiftCardDialogProps) => {
  const [step, setStep] = useState<Step>('type');
  const [selectedType, setSelectedType] = useState<GiftCardType | null>(null);
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  const resetForm = () => {
    setStep('type');
    setSelectedType(null);
    setAmount(25);
    setCustomAmount('');
    setSenderName('');
    setRecipientName('');
    setPersonalMessage('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleBack = () => {
    const steps: Step[] = ['type', 'amount', 'customize', 'confirm'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const steps: Step[] = ['type', 'amount', 'customize', 'confirm'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const getStepProgress = () => {
    const steps: Step[] = ['type', 'amount', 'customize', 'confirm'];
    return ((steps.indexOf(step) + 1) / steps.length) * 100;
  };

  const canProceed = () => {
    switch (step) {
      case 'type':
        return selectedType !== null;
      case 'amount':
        return amount > 0;
      case 'customize':
        return true;
      case 'confirm':
        return true;
      default:
        return false;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center gap-2 mb-6">
      {['type', 'amount', 'customize', 'confirm'].map((s, i) => (
        <div
          key={s}
          className={cn(
            'h-1 w-12 rounded-full transition-colors',
            step === s ? 'bg-primary' : i < ['type', 'amount', 'customize', 'confirm'].indexOf(step) ? 'bg-primary/60' : 'bg-muted'
          )}
        />
      ))}
    </div>
  );

  const renderTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Select Gift Card Type</h3>
        <p className="text-sm text-muted-foreground">Choose a theme for your gift card</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {giftCardTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type)}
            className={cn(
              'relative p-4 rounded-xl border-2 transition-all text-left',
              selectedType?.id === type.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <div className={cn('w-full h-16 rounded-lg bg-gradient-to-br mb-3', type.gradient)} />
            <div className="flex items-center gap-2">
              <span className="text-xl">{type.theme}</span>
              <span className="text-sm font-medium">{type.name}</span>
            </div>
            {selectedType?.id === type.id && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderAmountStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Select Amount</h3>
        <div className="text-5xl font-bold text-foreground mb-6">
          {amount} <span className="text-2xl text-primary">MUSD</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {presetAmounts.map((preset) => (
          <Button
            key={preset}
            variant={amount === preset && !customAmount ? 'default' : 'outline'}
            onClick={() => handleAmountSelect(preset)}
            className="py-6"
          >
            {preset} MUSD
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {customAmounts.map((preset) => (
          <Button
            key={preset}
            variant={amount === preset && !customAmount ? 'default' : 'outline'}
            onClick={() => handleAmountSelect(preset)}
            size="sm"
          >
            {preset} MUSD
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Custom Amount</Label>
        <div className="relative">
          <Input
            type="number"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="pr-16"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            MUSD
          </span>
        </div>
      </div>
    </div>
  );

  const renderCustomizeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Customize Gift</h3>
        <p className="text-sm text-muted-foreground">Add personal details to your gift card</p>
      </div>

      {/* Gift Card Preview */}
      {selectedType && (
        <div className={cn(
          'relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br p-6 text-white overflow-hidden',
          selectedType.gradient
        )}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Mezo IQ</span>
            </div>
            <div className="text-center">
              <h4 className="text-2xl md:text-3xl font-bold drop-shadow-lg">{selectedType.name}</h4>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-sm opacity-80">{senderName || 'From'}</span>
              <span className="text-xl font-bold">{amount} MUSD</span>
            </div>
          </div>
        </div>
      )}

      {/* Card Type Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {giftCardTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type)}
            className={cn(
              'flex-shrink-0 w-14 h-14 rounded-full border-2 overflow-hidden',
              selectedType?.id === type.id ? 'border-primary ring-2 ring-primary/50' : 'border-border'
            )}
          >
            <div className={cn('w-full h-full bg-gradient-to-br', type.gradient)} />
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>From (Optional)</Label>
          <Input
            placeholder="Your name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>To (Optional)</Label>
          <Input
            placeholder="Recipient's name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Personal Message (Optional)</Label>
          <Textarea
            placeholder="Write a personal message..."
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Confirm Your Gift Card</h3>
        <p className="text-sm text-muted-foreground">Review your gift card details</p>
      </div>

      {/* Summary Card */}
      {selectedType && (
        <div className={cn(
          'relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br p-6 text-white overflow-hidden',
          selectedType.gradient
        )}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Mezo IQ</span>
            </div>
            <div className="text-center">
              <h4 className="text-2xl md:text-3xl font-bold drop-shadow-lg">{selectedType.name}</h4>
              {personalMessage && (
                <p className="text-sm mt-2 opacity-90 italic">"{personalMessage}"</p>
              )}
            </div>
            <div className="flex justify-between items-end">
              <div className="text-sm opacity-80">
                {senderName && <div>From: {senderName}</div>}
                {recipientName && <div>To: {recipientName}</div>}
              </div>
              <span className="text-xl font-bold">{amount} MUSD</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 p-4 bg-muted/50 rounded-xl">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Gift Card Type</span>
          <span className="font-medium">{selectedType?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-medium">{amount} MUSD</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Cashback (2%)</span>
          <span className="font-medium text-primary">+{(amount * 0.02).toFixed(2)} MUSD</span>
        </div>
        <div className="border-t border-border my-2" />
        <div className="flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">{amount} MUSD</span>
        </div>
      </div>

      <Badge variant="outline" className="w-full justify-center py-2 text-primary border-primary/30">
        <Sparkles className="w-4 h-4 mr-2" />
        Earn 2% cashback on this purchase!
      </Badge>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          {step !== 'type' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="absolute left-0 top-0"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <DialogTitle className="text-center">
            {step === 'type' && 'Create Gift Card'}
            {step === 'amount' && 'Select Amount'}
            {step === 'customize' && 'Customize Gift'}
            {step === 'confirm' && 'Confirm Purchase'}
          </DialogTitle>
        </DialogHeader>

        {renderStepIndicator()}

        {step === 'type' && renderTypeStep()}
        {step === 'amount' && renderAmountStep()}
        {step === 'customize' && renderCustomizeStep()}
        {step === 'confirm' && renderConfirmStep()}

        <div className="mt-6">
          <Button
            className="w-full"
            size="lg"
            disabled={!canProceed()}
            onClick={step === 'confirm' ? handleClose : handleNext}
          >
            {step === 'confirm' ? 'Purchase Gift Card' : 'Continue'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
