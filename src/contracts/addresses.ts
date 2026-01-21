/**
 * Mezo IQ Contract Addresses
 * 
 * Update these addresses after deploying contracts to Mezo Mainnet
 * Deploy using: cd mezo-iq-contracts && npm run deploy:mezo
 */

export const CONTRACT_ADDRESSES = {
  // Token contracts
  MUSD: '0x0000000000000000000000000000000000000000' as const,
  TBTC: '0x0000000000000000000000000000000000000000' as const,
  
  // Platform contracts
  REWARDS: '0x0000000000000000000000000000000000000000' as const,
  MARKETPLACE: '0x0000000000000000000000000000000000000000' as const,
} as const;

// Mezo Network Configuration
export const MEZO_NETWORK = {
  chainId: 31612,
  name: 'Mezo Mainnet',
  rpcUrl: 'https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c',
  wsUrl: 'wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c',
  explorer: 'https://explorer.mezo.org',
  boarApiKey: '81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c',
} as const;

// Pyth Oracle Configuration
export const PYTH_CONFIG = {
  contractAddress: '0x2880aB155794e7179c9eE2e38200202908C17B43' as const,
  hermesEndpoint: 'https://hermes.pyth.network',
  priceFeeds: {
    BTC_USD: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    MUSD_USD: '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
  },
} as const;
