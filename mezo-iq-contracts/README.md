# Mezo IQ Smart Contracts

Smart contracts for the Mezo IQ gamified on-chain engagement platform.

## Contracts

### Rewards.sol
Handles the rewards system including:
- Points tracking and earning
- Challenge completion
- Cashback processing (2% on purchases)
- Level progression system
- MUSD reward claims

### Marketplace.sol
Handles the marketplace including:
- Product purchases with MUSD or tBTC
- NFT minting for digital products
- Gift card creation and redemption
- Purchase history tracking

## Deployment

### Prerequisites
```bash
npm install
```

### Environment Setup
Create a `.env` file:
```
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=optional_for_verification
```

### Deploy to Mezo Mainnet
```bash
npm run deploy:mezo
```

### Local Development
```bash
# Start local node
npm run node

# In another terminal, deploy
npm run deploy:local
```

## Network Configuration

- **Network**: Mezo Mainnet
- **Chain ID**: 31612
- **RPC**: https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
- **Explorer**: https://explorer.mezo.org

## Contract Addresses

After deployment, update the addresses in `src/contracts/addresses.ts`:

MUSD Token deployed to: 0x184bdc7B5cef1876622E67EB771fb2BD6a1A39D2
tBTC Token deployed to: 0x6f4336550306eC3F5a66c20aeE59799F6A4cef93
MezoRewards deployed to: 0xD2751343c6Ea9a849e38244D6667dAF3fF2870Fe
MezoMarketplace deployed to: 0x7C1F7D7C4224F6ED8320c00DEF3b93608FE545C1

## Testing

```bash
npm run test
```

## License

MIT
