// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title MezoMarketplace
 * @dev Marketplace contract for Mezo IQ - handles product purchases, NFTs, and gift cards
 */
contract MezoMarketplace is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    // State variables
    IERC20 public musdToken;
    IERC20 public tbtcToken;
    address public rewardsContract;
    
    Counters.Counter private _tokenIds;
    Counters.Counter private _purchaseIds;
    
    struct Product {
        string id;
        string name;
        string category;
        uint256 priceUSD; // Price in USD with 8 decimals
        bool isActive;
        bool isNFT;
        uint256 stock;
    }
    
    struct Purchase {
        uint256 id;
        address buyer;
        string productId;
        uint256 pricePaid;
        string paymentToken; // "MUSD" or "BTC"
        uint256 timestamp;
        uint256 cashbackEarned;
    }
    
    struct GiftCard {
        uint256 id;
        string cardType;
        uint256 amount;
        string senderName;
        string receiverName;
        address recipient;
        bool isRedeemed;
        uint256 createdAt;
    }
    
    struct NFTMetadata {
        string name;
        string collection;
        string rarity;
        string imageUri;
    }
    
    mapping(string => Product) public products;
    mapping(uint256 => Purchase) public purchases;
    mapping(address => uint256[]) public userPurchases;
    mapping(uint256 => GiftCard) public giftCards;
    mapping(address => uint256[]) public userGiftCards;
    mapping(uint256 => NFTMetadata) public nftMetadata;
    
    Counters.Counter private _giftCardIds;
    
    // Cashback rate: 2%
    uint256 public constant CASHBACK_RATE = 200;
    uint256 public constant BASIS_POINTS = 10000;
    
    // Events
    event ProductPurchased(
        uint256 indexed purchaseId,
        address indexed buyer,
        string productId,
        uint256 pricePaid,
        string paymentToken,
        uint256 cashback
    );
    event NFTMinted(uint256 indexed tokenId, address indexed buyer, string productId);
    event GiftCardCreated(uint256 indexed cardId, address indexed sender, string cardType, uint256 amount);
    event GiftCardRedeemed(uint256 indexed cardId, address indexed recipient);
    event ProductAdded(string productId, string name, uint256 priceUSD);
    event ProductUpdated(string productId, uint256 newPrice, bool isActive);
    
    constructor(
        address _musdToken,
        address _tbtcToken,
        address _rewardsContract
    ) ERC721("Mezo IQ NFT", "MEZONFTS") Ownable(msg.sender) {
        musdToken = IERC20(_musdToken);
        tbtcToken = IERC20(_tbtcToken);
        rewardsContract = _rewardsContract;
    }
    
    /**
     * @dev Purchase a product with MUSD
     */
    function purchaseWithMUSD(string calldata productId, uint256 amount) external nonReentrant {
        Product storage product = products[productId];
        require(product.isActive, "Product not available");
        require(!product.isNFT || product.stock > 0, "NFT out of stock");
        
        // Transfer MUSD from buyer
        require(musdToken.transferFrom(msg.sender, address(this), amount), "Payment failed");
        
        // Calculate cashback
        uint256 cashback = (amount * CASHBACK_RATE) / BASIS_POINTS;
        
        // Create purchase record
        _purchaseIds.increment();
        uint256 purchaseId = _purchaseIds.current();
        
        purchases[purchaseId] = Purchase({
            id: purchaseId,
            buyer: msg.sender,
            productId: productId,
            pricePaid: amount,
            paymentToken: "MUSD",
            timestamp: block.timestamp,
            cashbackEarned: cashback
        });
        
        userPurchases[msg.sender].push(purchaseId);
        
        // Mint NFT if product is NFT
        if (product.isNFT) {
            _mintNFT(msg.sender, productId);
            product.stock--;
        }
        
        emit ProductPurchased(purchaseId, msg.sender, productId, amount, "MUSD", cashback);
    }
    
    /**
     * @dev Purchase a product with tBTC
     */
    function purchaseWithBTC(string calldata productId, uint256 amount) external nonReentrant {
        Product storage product = products[productId];
        require(product.isActive, "Product not available");
        require(!product.isNFT || product.stock > 0, "NFT out of stock");
        
        // Transfer tBTC from buyer
        require(tbtcToken.transferFrom(msg.sender, address(this), amount), "Payment failed");
        
        // Calculate cashback (converted to MUSD equivalent)
        uint256 cashback = (amount * CASHBACK_RATE) / BASIS_POINTS;
        
        // Create purchase record
        _purchaseIds.increment();
        uint256 purchaseId = _purchaseIds.current();
        
        purchases[purchaseId] = Purchase({
            id: purchaseId,
            buyer: msg.sender,
            productId: productId,
            pricePaid: amount,
            paymentToken: "BTC",
            timestamp: block.timestamp,
            cashbackEarned: cashback
        });
        
        userPurchases[msg.sender].push(purchaseId);
        
        // Mint NFT if product is NFT
        if (product.isNFT) {
            _mintNFT(msg.sender, productId);
            product.stock--;
        }
        
        emit ProductPurchased(purchaseId, msg.sender, productId, amount, "BTC", cashback);
    }
    
    /**
     * @dev Create a gift card
     */
    function createGiftCard(
        string calldata cardType,
        uint256 amount,
        string calldata senderName,
        string calldata receiverName,
        address recipient
    ) external nonReentrant {
        require(amount > 0, "Amount must be positive");
        
        // Transfer MUSD for gift card value
        require(musdToken.transferFrom(msg.sender, address(this), amount), "Payment failed");
        
        _giftCardIds.increment();
        uint256 cardId = _giftCardIds.current();
        
        giftCards[cardId] = GiftCard({
            id: cardId,
            cardType: cardType,
            amount: amount,
            senderName: senderName,
            receiverName: receiverName,
            recipient: recipient,
            isRedeemed: false,
            createdAt: block.timestamp
        });
        
        userGiftCards[msg.sender].push(cardId);
        
        emit GiftCardCreated(cardId, msg.sender, cardType, amount);
    }
    
    /**
     * @dev Redeem a gift card
     */
    function redeemGiftCard(uint256 cardId) external nonReentrant {
        GiftCard storage card = giftCards[cardId];
        require(card.recipient == msg.sender, "Not the recipient");
        require(!card.isRedeemed, "Already redeemed");
        
        card.isRedeemed = true;
        
        // Transfer MUSD to recipient
        require(musdToken.transfer(msg.sender, card.amount), "Transfer failed");
        
        emit GiftCardRedeemed(cardId, msg.sender);
    }
    
    /**
     * @dev Internal function to mint NFT
     */
    function _mintNFT(address to, string memory productId) internal {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        
        _safeMint(to, tokenId);
        
        Product memory product = products[productId];
        nftMetadata[tokenId] = NFTMetadata({
            name: product.name,
            collection: product.category,
            rarity: "common",
            imageUri: ""
        });
        
        emit NFTMinted(tokenId, to, productId);
    }
    
    /**
     * @dev Add a new product (owner only)
     */
    function addProduct(
        string calldata id,
        string calldata name,
        string calldata category,
        uint256 priceUSD,
        bool isNFT,
        uint256 stock
    ) external onlyOwner {
        products[id] = Product({
            id: id,
            name: name,
            category: category,
            priceUSD: priceUSD,
            isActive: true,
            isNFT: isNFT,
            stock: stock
        });
        
        emit ProductAdded(id, name, priceUSD);
    }
    
    /**
     * @dev Update product (owner only)
     */
    function updateProduct(
        string calldata id,
        uint256 newPrice,
        bool isActive
    ) external onlyOwner {
        products[id].priceUSD = newPrice;
        products[id].isActive = isActive;
        
        emit ProductUpdated(id, newPrice, isActive);
    }
    
    /**
     * @dev Get user purchase history
     */
    function getUserPurchases(address user) external view returns (uint256[] memory) {
        return userPurchases[user];
    }
    
    /**
     * @dev Get purchase details
     */
    function getPurchase(uint256 purchaseId) external view returns (
        address buyer,
        string memory productId,
        uint256 pricePaid,
        string memory paymentToken,
        uint256 timestamp,
        uint256 cashbackEarned
    ) {
        Purchase memory p = purchases[purchaseId];
        return (p.buyer, p.productId, p.pricePaid, p.paymentToken, p.timestamp, p.cashbackEarned);
    }
    
    /**
     * @dev Get gift card details
     */
    function getGiftCard(uint256 cardId) external view returns (
        string memory cardType,
        uint256 amount,
        string memory senderName,
        string memory receiverName,
        address recipient,
        bool isRedeemed
    ) {
        GiftCard memory card = giftCards[cardId];
        return (card.cardType, card.amount, card.senderName, card.receiverName, card.recipient, card.isRedeemed);
    }
    
    /**
     * @dev Withdraw tokens (owner only)
     */
    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
    
    /**
     * @dev Update rewards contract address
     */
    function setRewardsContract(address _rewardsContract) external onlyOwner {
        rewardsContract = _rewardsContract;
    }
}
