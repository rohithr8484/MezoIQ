# 🪙 MezoIQ

Build applications that integrate Bitcoin into the digital experiences people already use, regardless of their crypto knowledge level.

## 🚀 Overview

This platform enables building Bitcoin-powered experiences for crypto natives, mainstream users, or bridging both audiences. Think gaming, social platforms, e-commerce, entertainment, and other digital services.

## ✨ Features

### 🔐 Wallet Integration
Connect popular Bitcoin wallets and manage transactions seamlessly with multi-wallet support.

### 🏆 Rewards & Challenges
Implement gamified experiences with Bitcoin rewards, leaderboards, and mini-games to engage users.

### 📱 Social Sharing
Share Bitcoin achievements, referrals, and rewards socially across platforms.

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

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/rohithr8484/bitcoin-everywhere.git
cd bitcoin-everywhere

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

# ⚡ Mezo Mainnet Configuration and Contracts

## 🧠 Pyth Network Oracle

**Contract Address:**  
`0x2880aB155794e7179c9eE2e38200202908C17B43`  
*(Mainnet & Testnet)*

**Type:**  
Price Feed Oracle

**packages**
@pythnetwork/pyth-evm-js v2.0.0-alpha2

@pythnetwork/price-service-client v1.9.0

**Purpose:**  
Provides real-time price feeds for crypto assets.

**Supported Feeds:**

| Asset Pair | Feed Address |
|-------------|--------------|
| **BTC/USD** | `0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43` |
| **ETH/USD** | `0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace` |
| **USDT/USD** | `0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b` |

---

## 🦈 Tigris DEX Contracts (Mezo Mainnet)

**Router:**  
`0x16A76d3cd3C1e3CE843C6680d6B37E9116b5C706`

**Pool Factory:**  
`0x83FE469C636C4081b87bA5b3Ae9991c6Ed104248`

**Liquidity Pools:**

| Pair | Contract Address |
|------|------------------|
| **MUSD/BTC** | `0x52e604c44417233b6CcEDDDc0d640A405Caacefb` |
| **MUSD/mUSDC** | `0xEd812AEc0Fecc8fD882Ac3eccC43f3aA80A6c356` |
| **MUSD/mUSDT** | `0x10906a9E9215939561597b4C8e4b98F93c02031A` |

---

## 💰 Token Contracts (Mezo Mainnet)

| Token | Address | Description | Decimals |
|--------|----------|--------------|-----------|
| **BTC (tBTC)** | `0x7b7C000000000000000000000000000000000000` | Native Bitcoin representation | 18 |
| **MUSD** | `0xdD468A1DDc392dcdbEf6db6e34E89AA338F9F186` | Mezo USD stablecoin proxy | 18 |
| **mUSDC** | `0x04671C72Aab5AC02A03c1098314b1BB6B560c197` | Bridged USDC | 6 |
| **mUSDT** | `0xeB5a5d39dE4Ea42C2Aa6A57EcA2894376683bB8E` | Bridged USDT | 6 |

---

## 🪪 Mezo Passport

**Package:**  
`@mezo-org/passport v0.11.0`

**Integration:**  
Through RainbowKit wallet connection




**Installation:**

```bash
npm install @mezo-org/passport @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query


## Folder structure
<img width="438" height="897" alt="image" src="https://github.com/user-attachments/assets/da3e3cc8-dd08-4abb-8b39-db63e59b4c41" />



## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to improve the project.

## 📄 License

This project is private. Please contact the maintainer for access.

---

**Bitcoin Everywhere** - Making Bitcoin accessible in every digital experience 🚀

*Built with modern web technologies and Bitcoin-first principles*
