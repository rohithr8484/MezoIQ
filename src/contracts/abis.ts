/**
 * Contract ABIs for Mezo IQ platform
 */

export const REWARDS_ABI = [
  // Read functions
  {
    name: 'getUserRewards',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'points', type: 'uint256' },
      { name: 'pendingMUSD', type: 'uint256' },
      { name: 'claimedMUSD', type: 'uint256' },
      { name: 'totalEarned', type: 'uint256' },
      { name: 'level', type: 'uint256' },
    ],
  },
  {
    name: 'isChallengeCompleted',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'challengeId', type: 'string' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'challenges',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'id', type: 'string' }],
    outputs: [
      { name: 'id', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'pointsReward', type: 'uint256' },
      { name: 'isActive', type: 'bool' },
    ],
  },
  // Write functions
  {
    name: 'completeChallenge',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'challengeId', type: 'string' }],
    outputs: [],
  },
  {
    name: 'claimRewards',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  // Events
  {
    name: 'PointsEarned',
    type: 'event',
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
      { name: 'reason', type: 'string', indexed: false },
    ],
  },
  {
    name: 'RewardsClaimed',
    type: 'event',
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'ChallengeCompleted',
    type: 'event',
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'challengeId', type: 'string', indexed: false },
      { name: 'pointsEarned', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'LevelUp',
    type: 'event',
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'newLevel', type: 'uint256', indexed: false },
    ],
  },
] as const;

export const MARKETPLACE_ABI = [
  // Read functions
  {
    name: 'products',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'id', type: 'string' }],
    outputs: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'category', type: 'string' },
      { name: 'priceUSD', type: 'uint256' },
      { name: 'isActive', type: 'bool' },
      { name: 'isNFT', type: 'bool' },
      { name: 'stock', type: 'uint256' },
    ],
  },
  {
    name: 'getUserPurchases',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'uint256[]' }],
  },
  {
    name: 'getPurchase',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'purchaseId', type: 'uint256' }],
    outputs: [
      { name: 'buyer', type: 'address' },
      { name: 'productId', type: 'string' },
      { name: 'pricePaid', type: 'uint256' },
      { name: 'paymentToken', type: 'string' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'cashbackEarned', type: 'uint256' },
    ],
  },
  {
    name: 'getGiftCard',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'cardId', type: 'uint256' }],
    outputs: [
      { name: 'cardType', type: 'string' },
      { name: 'amount', type: 'uint256' },
      { name: 'senderName', type: 'string' },
      { name: 'receiverName', type: 'string' },
      { name: 'recipient', type: 'address' },
      { name: 'isRedeemed', type: 'bool' },
    ],
  },
  // Write functions
  {
    name: 'purchaseWithMUSD',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'productId', type: 'string' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'purchaseWithBTC',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'productId', type: 'string' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'createGiftCard',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'cardType', type: 'string' },
      { name: 'amount', type: 'uint256' },
      { name: 'senderName', type: 'string' },
      { name: 'receiverName', type: 'string' },
      { name: 'recipient', type: 'address' },
    ],
    outputs: [],
  },
  {
    name: 'redeemGiftCard',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'cardId', type: 'uint256' }],
    outputs: [],
  },
  // Events
  {
    name: 'ProductPurchased',
    type: 'event',
    inputs: [
      { name: 'purchaseId', type: 'uint256', indexed: true },
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'productId', type: 'string', indexed: false },
      { name: 'pricePaid', type: 'uint256', indexed: false },
      { name: 'paymentToken', type: 'string', indexed: false },
      { name: 'cashback', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'NFTMinted',
    type: 'event',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'productId', type: 'string', indexed: false },
    ],
  },
  {
    name: 'GiftCardCreated',
    type: 'event',
    inputs: [
      { name: 'cardId', type: 'uint256', indexed: true },
      { name: 'sender', type: 'address', indexed: true },
      { name: 'cardType', type: 'string', indexed: false },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'GiftCardRedeemed',
    type: 'event',
    inputs: [
      { name: 'cardId', type: 'uint256', indexed: true },
      { name: 'recipient', type: 'address', indexed: true },
    ],
  },
] as const;

export const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'transferFrom',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;
