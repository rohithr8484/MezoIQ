import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    walletConnect({
      projectId: '696956c426d467cb2aed00d4b0a543b2',
    }),
    coinbaseWallet({
      appName: 'Bitcoin Rewards Hub',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});
