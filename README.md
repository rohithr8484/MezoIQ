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

## Folder structure
mezo-rewards-app/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   ├── BoarWalletButton.tsx
│   │   ├── ChallengesSection.tsx
│   │   ├── ClaimDialog.tsx
│   │   ├── Hero.tsx
│   │   ├── LeaderboardSection.tsx
│   │   ├── MiniGamesDialog.tsx
│   │   ├── ReferralSection.tsx
│   │   ├── RewardsDashboard.tsx
│   │   ├── RewardsHub.tsx
│   │   ├── SocialShareDialog.tsx
│   │   └── WalletConnectButton.tsx
│   ├── config/
│   │   └── wagmi.ts
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useChallenges.ts
│   │   └── useMezoContracts.ts
│   │   └── useUserProgress.ts
│   ├── lib/
│   │   └── (utility libraries)
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── rewards.ts
│   ├── utils/
│   │   └── pythPrice.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to improve the project.

## 📄 License

This project is private. Please contact the maintainer for access.

---

**Bitcoin Everywhere** - Making Bitcoin accessible in every digital experience 🚀

*Built with modern web technologies and Bitcoin-first principles*
