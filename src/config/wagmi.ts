import { createConfig, http, webSocket } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { defineChain } from 'viem';

// Define Mezo Mainnet chain
export const mezoMainnet = defineChain({
  id: 31612,
  name: 'Mezo Mainnet',
  network: 'mezo',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c'],
      webSocket: ['wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c'],
    },
    public: {
      http: ['https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c'],
      webSocket: ['wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c'],
    },
  },
  blockExplorers: {
    default: { name: 'Mezo Explorer', url: 'https://explorer.mezo.org' },
  },
});

export const config = createConfig({
  chains: [mezoMainnet, mainnet],
  connectors: [
    walletConnect({
      projectId: '696956c426d467cb2aed00d4b0a543b2',
    }),
    coinbaseWallet({
      appName: 'Mezo IQ',
    }),
  ],
  transports: {
    [mezoMainnet.id]: http('https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c'),
    [mainnet.id]: http(),
  },
});
