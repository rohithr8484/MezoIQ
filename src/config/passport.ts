import { getConfig, mezoMainnet } from '@mezo-org/passport';

// WalletConnect project ID for Mezo Passport
const WALLET_CONNECT_PROJECT_ID = '696956c426d467cb2aed00d4b0a543b2';

export const passportConfig = getConfig({
  appName: 'Mezo IQ',
  mezoNetwork: 'mainnet',
  walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
});

export { mezoMainnet };
