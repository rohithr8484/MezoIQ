import type { Product } from '@/types/product';

export const products: Product[] = [
  // NFT Collection
  {
    id: 'nft_1',
    name: 'Genesis Warrior',
    description: 'Legendary warrior from the Mezo Genesis collection with exclusive holder benefits',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    priceUSD: 299,
    category: 'nft',
    collection: 'Genesis Collection',
    rarity: 'legendary',
  },
  {
    id: 'nft_2',
    name: 'Cyber Phoenix',
    description: 'Epic cybernetic phoenix with animated flames and special abilities',
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=400&fit=crop',
    priceUSD: 149,
    category: 'nft',
    collection: 'Cyber Beasts',
    rarity: 'epic',
  },
  {
    id: 'nft_3',
    name: 'Quantum Ape',
    description: 'Rare quantum ape with holographic effects and staking multiplier',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop',
    priceUSD: 89,
    category: 'nft',
    collection: 'Quantum Zoo',
    rarity: 'rare',
  },
  {
    id: 'nft_4',
    name: 'Neon Tiger',
    description: 'Common neon tiger with dynamic color patterns and community access',
    image: 'https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=400&h=400&fit=crop',
    priceUSD: 29,
    category: 'nft',
    collection: 'Neon Safari',
    rarity: 'common',
  },
  {
    id: 'nft_5',
    name: 'Bitcoin Punk',
    description: 'Epic pixelated punk with Bitcoin-themed accessories and rewards boost',
    image: 'https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=400&h=400&fit=crop',
    priceUSD: 179,
    category: 'nft',
    collection: 'BTC Punks',
    rarity: 'epic',
  },
  {
    id: 'nft_6',
    name: 'Mezo Spirit',
    description: 'Legendary ethereal spirit with maximum staking rewards and governance rights',
    image: 'https://images.unsplash.com/photo-1618176729940-2d3eac1a4d1c?w=400&h=400&fit=crop',
    priceUSD: 499,
    category: 'nft',
    collection: 'Spirit Realm',
    rarity: 'legendary',
  },
  // Hardware
  {
    id: 'prod_1',
    name: 'Mezo Hardware Wallet',
    description: 'Secure hardware wallet for Bitcoin and Mezo assets with multi-signature support',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    priceUSD: 49,
    category: 'hardware',
  },
  // Software
  {
    id: 'prod_2',
    name: 'Premium API Access',
    description: 'Unlimited API calls, advanced analytics, and priority support for 1 year',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    priceUSD: 39,
    category: 'software',
  },
  {
    id: 'prod_3',
    name: 'NFT Collection Pass',
    description: 'Exclusive access to limited edition Mezo NFT collection with holder benefits',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=300&fit=crop',
    priceUSD: 49,
    category: 'software',
  },
  // Services
  {
    id: 'prod_4',
    name: 'Bitcoin Mining Course',
    description: 'Comprehensive course on Bitcoin mining, staking, and DeFi strategies',
    image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=300&fit=crop',
    priceUSD: 29,
    category: 'service',
  },
  {
    id: 'prod_5',
    name: 'Smart Contract Audit',
    description: 'Professional security audit for your Mezo smart contracts by certified experts',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    priceUSD: 39,
    category: 'service',
  },
  {
    id: 'prod_6',
    name: 'Mezo Developer Kit',
    description: 'Complete SDK with tools, libraries, and documentation for building on Mezo',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
    priceUSD: 19,
    category: 'software',
  },
];

export const nftProducts = products.filter(p => p.category === 'nft');
export const otherProducts = products.filter(p => p.category !== 'nft');
