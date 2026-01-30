import type { Product } from '@/types/product';

// Import NFT images
import nftGenesisWarrior from '@/assets/nft-genesis-warrior.png';
import nftCyberPhoenix from '@/assets/nft-cyber-phoenix.png';
import nftQuantumApe from '@/assets/nft-quantum-ape.png';
import nftNeonTiger from '@/assets/nft-neon-tiger.png';
import nftBitcoinPunk from '@/assets/nft-bitcoin-punk.png';
import nftMezoSpirit from '@/assets/nft-mezo-spirit.png';

// Import Ordinal images
import ordinalNodemonke from '@/assets/ordinal-nodemonke.png';
import ordinalPuppet from '@/assets/ordinal-puppet.png';
import ordinalQuantumCat from '@/assets/ordinal-quantum-cat.png';
import ordinalWizard from '@/assets/ordinal-wizard.png';
import ordinalRunestone from '@/assets/ordinal-runestone.png';
import ordinalPizzaNinja from '@/assets/ordinal-pizza-ninja.png';

export const products: Product[] = [
  // NFT Collection
  {
    id: 'nft_1',
    name: 'Genesis Warrior',
    description: 'Legendary warrior from the Mezo Genesis collection with exclusive holder benefits',
    image: nftGenesisWarrior,
    priceUSD: 299,
    category: 'nft',
    collection: 'Genesis Collection',
    rarity: 'legendary',
  },
  {
    id: 'nft_2',
    name: 'Cyber Phoenix',
    description: 'Epic cybernetic phoenix with animated flames and special abilities',
    image: nftCyberPhoenix,
    priceUSD: 149,
    category: 'nft',
    collection: 'Cyber Beasts',
    rarity: 'epic',
  },
  {
    id: 'nft_3',
    name: 'Quantum Ape',
    description: 'Rare quantum ape with holographic effects and staking multiplier',
    image: nftQuantumApe,
    priceUSD: 89,
    category: 'nft',
    collection: 'Quantum Zoo',
    rarity: 'rare',
  },
  {
    id: 'nft_4',
    name: 'Neon Tiger',
    description: 'Common neon tiger with dynamic color patterns and community access',
    image: nftNeonTiger,
    priceUSD: 29,
    category: 'nft',
    collection: 'Neon Safari',
    rarity: 'common',
  },
  {
    id: 'nft_5',
    name: 'Bitcoin Punk',
    description: 'Epic pixelated punk with Bitcoin-themed accessories and rewards boost',
    image: nftBitcoinPunk,
    priceUSD: 179,
    category: 'nft',
    collection: 'BTC Punks',
    rarity: 'epic',
  },
  {
    id: 'nft_6',
    name: 'Mezo Spirit',
    description: 'Legendary ethereal spirit with maximum staking rewards and governance rights',
    image: nftMezoSpirit,
    priceUSD: 499,
    category: 'nft',
    collection: 'Spirit Realm',
    rarity: 'legendary',
  },
  // Ordinals Collection
  {
    id: 'ord_1',
    name: 'NodeMonke #1247',
    description: 'Pixel art NodeMonke inscribed on Bitcoin. One of the most iconic Ordinal collections.',
    image: ordinalNodemonke,
    priceUSD: 2190,
    category: 'ordinal',
    collection: 'NodeMonkes',
    rarity: 'rare',
  },
  {
    id: 'ord_2',
    name: 'Bitcoin Puppet #892',
    description: 'Hand-drawn puppet character from the beloved Bitcoin Puppets collection.',
    image: ordinalPuppet,
    priceUSD: 1050,
    category: 'ordinal',
    collection: 'Bitcoin Puppets',
    rarity: 'epic',
  },
  {
    id: 'ord_3',
    name: 'Quantum Cat #456',
    description: 'Mystical Quantum Cat with unique traits. A Taproot Wizards collaboration.',
    image: ordinalQuantumCat,
    priceUSD: 1100,
    category: 'ordinal',
    collection: 'Quantum Cats',
    rarity: 'epic',
  },
  {
    id: 'ord_4',
    name: 'Taproot Wizard #2341',
    description: 'Legendary Taproot Wizard with magical powers inscribed on Bitcoin.',
    image: ordinalWizard,
    priceUSD: 5750,
    category: 'ordinal',
    collection: 'Taproot Wizards',
    rarity: 'legendary',
  },
  {
    id: 'ord_5',
    name: 'Runestone #8823',
    description: 'Ancient Runestone artifact. A piece of Bitcoin history with Runes protocol.',
    image: ordinalRunestone,
    priceUSD: 100,
    category: 'ordinal',
    collection: 'Runestone',
    rarity: 'common',
  },
  {
    id: 'ord_6',
    name: 'Pizza Ninja #1337',
    description: 'Legendary Pizza Ninja celebrating Bitcoin Pizza Day. Extremely rare traits.',
    image: ordinalPizzaNinja,
    priceUSD: 970,
    category: 'ordinal',
    collection: 'Pizza Ninjas',
    rarity: 'rare',
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
export const ordinalProducts = products.filter(p => p.category === 'ordinal');
export const otherProducts = products.filter(p => p.category !== 'nft' && p.category !== 'ordinal');
