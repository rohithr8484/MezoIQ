# 🪙 MezoIQ

Mezo IQ is a gamified on-chain engagement and analytics platform built on the Mezo Bitcoin-powered blockchain, designed to drive sustained user participation and retention. It transforms real on-chain activity — including buying products with MUSD, staking, DeFi interactions, and commerce — into achievement-driven experiences rooted in verifiable blockchain behavior. Users complete challenges, climb live leaderboards, and earn rewards by actively participating across the Mezo ecosystem. Mezo IQ combines real-time activity tracking, competitive progression, and an on-chain rewards marketplace, enabling users to unlock badges, levels, and MUSD-denominated incentives while gaining clear insights into their on-chain footprint.

- Integrated on-chain marketplace
AI personalized Commerce application with experiences where shopping with MUSD to unlock additional reward points for buying NFTS, gift cards, streaming and gaming,.

- Gamified on-chain engagement app
A consumer-facing marketplace with NFTs, Gift Cards and other items  built on a Mezo blockchain that rewards users for real on-chain activity.

- Achievement-driven activity tracking
Everyday actions such as shopping, gaming and transactions with MUSD are converted into measurable achievements and progress. There are so many reasons to start earning MUSD with gift card, NFT and other purchases!

- Challenges & missions
Users participate in time-bound and ongoing challenges linked directly to on-chain behavior.

- Live leaderboards
Real-time rankings that promote competition and reward consistent engagement.

- Rewards & incentives system
Users earn on-chain rewards through participation, challenge completion, and marketplace activity.

- Badges & level progression
Visual progression system that reflects user activity, loyalty, and engagement depth.

<img width="705" height="340" alt="image" src="https://github.com/user-attachments/assets/deeb9740-9afb-4bc9-b40b-c641173bdb4a" />
<p align="left"> <img src="https://img.shields.io/badge/Mezo-pink?style=flat-square" /> <img src="https://img.shields.io/badge/Challenge-yellow?style=flat-square" /> <img src="https://img.shields.io/badge/Rewards-blue?style=flat-square" /> </p>




## ✨ Features

### 🔐 Wallet Integration
Connect popular Bitcoin wallets and manage transactions seamlessly with multi-wallet support.

### 🏆 Rewards & Challenges
Implement gamified experiences with Bitcoin rewards, leaderboards, and mini-games to engage users.

### 📱 Social Sharing
Share MUSD achievements, referrals, and rewards socially across platforms.

### 💰 MUSD Integration
Seamless integration with MUSD for stable transactions and reward distribution.

### 📊 Pyth Oracle Integration
Low-latency pull oracle design where users can pull price updates onchain when needed.

### 🌐 Cross-Platform Ready
Built with React, Vite, and TypeScript for smooth development and deployment.

## 🛠 Tech Stack

### Frontend
- **React** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### State Management
- **React Query** - Server state management
- **Zod** - Schema validation

### Bitcoin & Oracle Integration
- **@mezo-org/passport** - Bitcoin wallet connectivity
- **RainbowKit** - Wallet management
- **Sats Connect** - Bitcoin transaction handling
- **Wagmi** - React Hooks for blockchain
- **Viem** - Blockchain interaction library
- **MUSD SDK** - Stablecoin integration
- **Pyth Network** - Real-time price oracle (400ms updates)

### UI/UX Enhancements
- **Lucide Icons** - Beautiful iconography
- **Sonner** - Toast notifications
- **Embla Carousel** - Smooth carousel components

### Routing & Forms
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling with resolvers

## Technical Architecture

<img width="1024" height="1536" alt="ChatGPT Image Jan 18, 2026, 05_30_28 PM" src="https://github.com/user-attachments/assets/8346d60c-5a66-4279-b3ee-6542976f4f27" />


## Mezo Testnet and Mainet Contracts

Mezo Network Configuration

**Chain ID:** 31612

**Network:** Mezo Testnet & Mainnet

**Native Currency:** MUSD 


**RPC Endpoint:**            

https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c



**Explorer:**

https://explorer.mezo.org


## **Pyth Oracle Contracts (Price Feeds)**

**Contract Addresses:**

**Mainnet:** 0x2880aB155794e7179c9eE2e38200202908C17B43

**Testnet:** 0x2880aB155794e7179c9eE2e38200202908C17B43

**Price Feed IDs:**

Type: Oracle price feed contracts for real-time token pricing

**BTC/USD:** 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43

**MUSD/USD:** 0x0617a9b725011a126a2b9fd53563f4236501f32cf76d877644b943394606c6de


## Environment variables


### 🌐 Mezo Network Configuration

```bash
MEZO_CHAIN_ID=

MEZO_BOAR_API_KEY=

MEZO_RPC_HTTP=

MEZO_RPC_WS=

MEZO_BLOCK_EXPLORER=
```


### 🔮 Pyth Oracle Configuration

```bash

PYTH_HERMES_ENDPOINT=

PYTH_CONTRACT_ADDRESS=

PYTH_BTC_USD_FEED_ID=

PYTH_MUSD_USD_FEED_ID=
```

### ☁️ Validation Cloud

```bash

MEZO_VALIDATION_CLOUD_MAINNET_URL=

```

### 🔗 WalletConnect

```bash

WALLETCONNECT_PROJECT_ID=
```


## Solidity contracts

```bash

cd MezoIQ

# 1. Install dependencies
npm install
npm install --save-dev @nomicfoundation/hardhat-ethers ethers dotenv

# 2. Create environment file
echo PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE > .env

# 3. Compile contracts
npx hardhat compile

# 4. Deploy to Mezo
npx hardhat run scripts/deploy.ts --network mezo

```
## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/rohithr8484/MezoIQ.git
cd MezoIQ

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser at `http://localhost:5173`

## Usage

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## Folder structure
<img width="438" height="897" alt="image" src="https://github.com/user-attachments/assets/da3e3cc8-dd08-4abb-8b39-db63e59b4c41" />



## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to improve the project.

## 📄 License

This project is private. Please contact the maintainer for access.

---

**Bitcoin Everywhere** - Making Bitcoin accessible in every digital experience 🚀

*Built with modern web technologies and Bitcoin-first principles*
