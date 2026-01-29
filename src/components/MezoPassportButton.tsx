import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Wallet, Check, LogOut } from 'lucide-react';

export const MezoPassportButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={openConnectModal}
                    className="gap-3 border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    <Wallet className="w-5 h-5 text-primary" />
                    <span>Mezo Passport</span>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={openChainModal}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={openAccountModal}
                  className="gap-3 border-primary/30 hover:border-primary"
                >
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-foreground">
                    {account.displayName}
                  </span>
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
