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
- MUSD Token: `0x...`
- tBTC Token: `0x...`
- MezoRewards: `0x...`
- MezoMarketplace: `0x...`

## Testing

```bash
npm run test
```

## License

MIT
