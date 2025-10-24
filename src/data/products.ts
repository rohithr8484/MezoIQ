import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Mezo Hardware Wallet',
    description: 'Secure hardware wallet for Bitcoin and Mezo assets with multi-signature support',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    priceUSD: 49,
    category: 'hardware',
  },
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
