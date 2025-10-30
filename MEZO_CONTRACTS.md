# Mezo Contracts & Integrations Documentation

## Overview
This document provides comprehensive information about all contracts, integrations, and protocols used in the Mezo IQ application.

---

## 1. Mezo Network Configuration

### Network Details
- **Network Name**: Mezo Mainnet
- **Chain ID**: 31612
- **Native Currency**: BTC (Bitcoin)
  - Symbol: BTC
  - Decimals: 18
- **RPC Endpoint**: `https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c`
- **WebSocket**: `wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c`
- **Block Explorer**: https://explorer.mezo.org
- **API Key**: `81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c` (Boar Network)

### Configuration File
Location: `src/config/wagmi.ts`

---

## 2. Mezo Passport Integration

### Purpose
Mezo Passport is built on top of RainbowKit and provides wallet connection options specifically tailored for Bitcoin wallets and Mezo Mainnet. It enables Bitcoin wallets to interact with EVM-based applications seamlessly.

### Package
- **NPM Package**: `@mezo-org/passport`
- **Version**: ^0.9.0
- **Documentation**: https://www.npmjs.com/package/@mezo-org/passport
- **GitHub**: https://github.com/mezo-org/passport

### Key Features
1. **Wallet Management**: Connect/disconnect Bitcoin and EVM wallets
2. **Interoperability**: Integrates with viem and wagmi libraries
3. **Smart Account**: Each Bitcoin wallet has an underlying smart account on Mezo Mainnet
4. **Multi-Chain Support**: Unified interface for Bitcoin and EVM operations

### Supported Wallets

#### Bitcoin Wallets (via Mezo Passport)
- **Unisat Wallet**: Bitcoin wallet for Web3
- **OKX Wallet**: Multi-chain crypto wallet
- **Xverse Wallet**: Bitcoin & Stacks wallet

#### EVM Wallets (via wagmi/RainbowKit)
- **MetaMask**: Popular Ethereum wallet
- **WalletConnect**: Protocol for connecting wallets
- **Coinbase Wallet**: Coinbase's self-custody wallet

### Components
1. **MezoPassportButton** (`src/components/MezoPassportButton.tsx`)
   - Custom connect button using RainbowKit
   - Displays connection status and account info
   - Handles chain switching

2. **BitcoinAccountInfo** (`src/components/BitcoinAccountInfo.tsx`)
   - Displays Bitcoin wallet address
   - Shows BTC balance (total, confirmed, unconfirmed)
   - Uses `useBitcoinAccount()` hook from Mezo Passport

3. **PassportDashboard** (`src/components/PassportDashboard.tsx`)
   - Main dashboard for Mezo Passport
   - Shows both Bitcoin and Mezo Mainnet accounts
   - Displays balances and connection status

### Hooks & Functions

#### From @mezo-org/passport
```typescript
import { useBitcoinAccount } from '@mezo-org/passport';

const { btcAddress, btcBalance } = useBitcoinAccount();
// btcBalance format: { confirmed: number, unconfirmed: number, total: number }
```

#### Configuration
```typescript
import { getConfig } from '@mezo-org/passport';

const config = getConfig({
  appName: 'Mezo IQ',
  chains: [mezoMainnet],
});
```

---

## 3. Pyth Network Oracle Integration

### Purpose
Real-time price feeds for cryptocurrency pricing (BTC/USD, MUSD/USD) using Pyth Network's decentralized oracle.

### Hermes Client
- **Endpoint**: `https://hermes.pyth.network`
- **Package**: `@pythnetwork/hermes-client` ^2.0.0

### Price Feed IDs

#### BTC/USD Price Feed
```
0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
```

#### MUSD/USD Price Feed
```
0x0617a9b725011a126a2b9fd53563f4236501f32cf76d877644b943394606c6de
```

### Pyth Contract Addresses on Mezo
```typescript
export const PYTH_CONTRACTS = {
  mainnet: '0x2880aB155794e7179c9eE2e38200202908C17B43',
  testnet: '0x2880aB155794e7179c9eE2e38200202908C17B43',
};
```

### Implementation Files
1. **pythPrice.ts** (`src/utils/pythPrice.ts`)
   - BTC/USD price fetching
   - Price formatting utilities

2. **pythPriceOracles.ts** (`src/utils/pythPriceOracles.ts`)
   - Multiple token price feeds
   - USD to token conversion utilities

3. **PythPriceDisplay.tsx** (`src/components/PythPriceDisplay.tsx`)
   - Live BTC price display component
   - Shows price changes and confidence intervals

### Functions

#### Get BTC Price
```typescript
import { getBTCPrice } from '@/utils/pythPrice';

const priceData = await getBTCPrice();
// Returns: { price: number, timestamp: number, confidence: number }
```

#### Get Token Price (Generic)
```typescript
import { getTokenPrice } from '@/utils/pythPriceOracles';

const tokenPrice = await getTokenPrice(PRICE_FEED_IDS.BTC_USD);
```

#### Convert USD to Token
```typescript
import { convertUSDToToken } from '@/utils/pythPriceOracles';

const tokenAmount = convertUSDToToken(100, tokenPrice);
```

---

## 4. Mezo Protocol Contracts

**⚠️ IMPORTANT**: These contracts are currently using placeholder addresses and need to be replaced with actual deployed contract addresses on Mezo Mainnet.

### Rewards Contract
```typescript
const MEZO_REWARDS_CONTRACT = '0x0000000000000000000000000000000000000000';
```
- **Type**: Rewards distribution contract
- **Functions**: 
  - `claimRewards(amount)`: Claim pending rewards
  - Query reward balances

### MUSD Contract (Mezo USD Stablecoin)
```typescript
const MUSD_CONTRACT = '0x0000000000000000000000000000000000000000';
```
- **Type**: ERC-20 token contract
- **Standard Functions**:
  - `balanceOf(address)`: Get token balance
  - `transfer(to, amount)`: Transfer tokens
  - `approve(spender, amount)`: Approve spending

### tBTC Contract (Tokenized Bitcoin)
```typescript
const TBTC_CONTRACT = '0x0000000000000000000000000000000000000000';
```
- **Type**: ERC-20 token contract
- **Standard Functions**:
  - `balanceOf(address)`: Get token balance
  - `transfer(to, amount)`: Transfer tokens
  - `approve(spender, amount)`: Approve spending

### Implementation File
Location: `src/hooks/useMezoContracts.ts`

### Hook Usage
```typescript
import { useMezoContracts } from '@/hooks/useMezoContracts';

const {
  rewardBalance,      // Current reward balances
  claimRewards,       // Function to claim rewards
  estimateGas,        // Function to estimate gas costs
  swapMUSDToTBTC,     // Function to swap tokens
  isPending,          // Transaction pending status
  isConnected,        // Wallet connection status
} = useMezoContracts();
```

### Reward Balance Structure
```typescript
interface RewardBalance {
  points: number;       // Total loyalty points
  pending: number;      // Pending rewards to claim
  claimed: number;      // Already claimed rewards
  musdBalance: number;  // MUSD token balance
  tbtcBalance: number;  // tBTC token balance
}
```

---

## 5. Validation Cloud Service

### Purpose
Fetches real-time blockchain data from Validation Cloud API for Mezo Mainnet monitoring.

### Implementation
- **File**: `src/components/ValidationCloudService.tsx`
- **Features**: 
  - Display current block height
  - Show network status (live/offline)
  - Auto-refresh block data

---

## 6. Wallet Integration

### Custom Mezo Wallet Hook
Location: `src/hooks/useMezoWallet.ts`

### Features
- MetaMask connection to Mezo Mainnet
- Automatic network switching
- Add Mezo Mainnet to wallet if not present
- Account change detection
- Chain change detection

### Usage
```typescript
import { useMezoWallet } from '@/hooks/useMezoWallet';

const {
  isConnected,    // Connection status
  address,        // User's wallet address
  connect,        // Connect wallet function
  disconnect,     // Disconnect wallet function
  chainId,        // Current chain ID
  rpcUrl,         // RPC endpoint
  apiKey,         // Boar Network API key
} = useMezoWallet();
```

---

## 7. Contract Interaction Summary

### Read Operations (View Functions)
- ✅ Token balances (`balanceOf`)
- ✅ Price feeds (Pyth oracles)
- ✅ Blockchain data (Validation Cloud)

### Write Operations (Transactions)
- 🚧 Claim rewards (placeholder)
- 🚧 Token swaps (placeholder)
- 🚧 Token transfers (placeholder)

**Legend**: 
- ✅ Fully implemented
- 🚧 Mock implementation (needs real contract addresses)

---

## 8. Integration Checklist

### To Deploy to Production
- [ ] Replace placeholder contract addresses with real deployed contracts
- [ ] Test all wallet connections (Bitcoin + EVM wallets)
- [ ] Verify Pyth price feeds are accurate
- [ ] Test reward claim functionality with real contracts
- [ ] Verify MUSD and tBTC token contracts
- [ ] Test gas estimation with real transactions
- [ ] Ensure proper error handling for all contract interactions
- [ ] Audit smart contracts before deployment

---

## 9. Environment Configuration

### Required for Production
```
MEZO_MAINNET_RPC=https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
MEZO_MAINNET_WSS=wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
MEZO_CHAIN_ID=31612
BOAR_API_KEY=81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
WALLETCONNECT_PROJECT_ID=696956c426d467cb2aed00d4b0a543b2
```

---

## 10. Security Considerations

### Best Practices
1. ✅ Use established libraries (wagmi, viem, RainbowKit)
2. ✅ Validate all user inputs
3. ✅ Handle errors gracefully
4. ⚠️ Implement proper access controls for contract interactions
5. ⚠️ Add slippage protection for swaps
6. ⚠️ Verify contract addresses before deployment
7. ⚠️ Audit all smart contracts

### RPC Security
- API key is visible in client code (acceptable for public RPC endpoints)
- For production, consider rate limiting or private RPC endpoints

---

## 11. Testing Guidelines

### Wallet Connection Testing
1. Test Bitcoin wallet connections (Unisat, OKX, Xverse)
2. Test EVM wallet connections (MetaMask, WalletConnect)
3. Verify network switching works correctly
4. Test account switching
5. Verify balance displays are accurate

### Contract Interaction Testing
1. Test price feed updates
2. Verify reward calculations
3. Test token transfers
4. Verify gas estimations
5. Test error handling

---

## Resources

### Official Documentation
- [Mezo Documentation](https://mezo.org/docs/developers/)
- [Mezo Passport NPM](https://www.npmjs.com/package/@mezo-org/passport)
- [Pyth Network Docs](https://docs.pyth.network/)
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [Wagmi Docs](https://wagmi.sh/)
- [Viem Docs](https://viem.sh/)

### Explorer & Tools
- [Mezo Explorer](https://explorer.mezo.org)
- [Boar Network RPC](https://boar.network)
- [Pyth Hermes](https://hermes.pyth.network)

---

**Last Updated**: 2025-10-30
**Version**: 1.0.0
