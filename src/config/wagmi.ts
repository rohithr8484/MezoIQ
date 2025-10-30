import { getConfig } from '@mezo-org/passport';
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

// Mezo Passport configuration with Bitcoin wallet support
// By default supports Unisat, OKX, and Xverse wallets
export const config = getConfig({
  appName: 'Mezo IQ',
  chains: [mezoMainnet],
});
