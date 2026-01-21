// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title MezoRewards
 * @dev Rewards contract for Mezo IQ platform - handles points, challenges, and cashback
 */
contract MezoRewards is Ownable, ReentrancyGuard {
    // State variables
    IERC20 public musdToken;
    
    struct UserRewards {
        uint256 points;
        uint256 pendingMUSD;
        uint256 claimedMUSD;
        uint256 totalEarned;
        uint256 level;
        uint256 lastClaimTime;
    }
    
    struct Challenge {
        string id;
        string title;
        uint256 pointsReward;
        bool isActive;
    }
    
    mapping(address => UserRewards) public userRewards;
    mapping(address => mapping(string => bool)) public completedChallenges;
    mapping(string => Challenge) public challenges;
    
    // Cashback rate: 2% = 200 basis points
    uint256 public constant CASHBACK_RATE = 200;
    uint256 public constant BASIS_POINTS = 10000;
    
    // Events
    event PointsEarned(address indexed user, uint256 amount, string reason);
    event RewardsClaimed(address indexed user, uint256 amount);
    event ChallengeCompleted(address indexed user, string challengeId, uint256 pointsEarned);
    event CashbackEarned(address indexed user, uint256 purchaseAmount, uint256 cashbackAmount);
    event LevelUp(address indexed user, uint256 newLevel);
    
    constructor(address _musdToken) Ownable(msg.sender) {
        musdToken = IERC20(_musdToken);
        _initializeChallenges();
    }
    
    function _initializeChallenges() internal {
        challenges["1"] = Challenge("1", "Daily Login", 10, true);
        challenges["2"] = Challenge("2", "First Purchase", 50, true);
        challenges["3"] = Challenge("3", "Connect Wallet", 25, true);
        challenges["4"] = Challenge("4", "Claim Rewards", 30, true);
        challenges["5"] = Challenge("5", "Refer Friend", 100, true);
        challenges["6"] = Challenge("6", "Complete Profile", 20, true);
    }
    
    /**
     * @dev Earn points for completing actions
     */
    function earnPoints(address user, uint256 amount, string calldata reason) external onlyOwner {
        userRewards[user].points += amount;
        userRewards[user].totalEarned += amount;
        
        _checkLevelUp(user);
        
        emit PointsEarned(user, amount, reason);
    }
    
    /**
     * @dev Complete a challenge and earn rewards
     */
    function completeChallenge(string calldata challengeId) external nonReentrant {
        require(challenges[challengeId].isActive, "Challenge not active");
        require(!completedChallenges[msg.sender][challengeId], "Challenge already completed");
        
        completedChallenges[msg.sender][challengeId] = true;
        
        uint256 pointsReward = challenges[challengeId].pointsReward;
        userRewards[msg.sender].points += pointsReward;
        userRewards[msg.sender].totalEarned += pointsReward;
        
        _checkLevelUp(msg.sender);
        
        emit ChallengeCompleted(msg.sender, challengeId, pointsReward);
    }
    
    /**
     * @dev Process cashback for a purchase
     */
    function processCashback(address buyer, uint256 purchaseAmount) external onlyOwner nonReentrant {
        uint256 cashbackAmount = (purchaseAmount * CASHBACK_RATE) / BASIS_POINTS;
        
        userRewards[buyer].pendingMUSD += cashbackAmount;
        
        emit CashbackEarned(buyer, purchaseAmount, cashbackAmount);
    }
    
    /**
     * @dev Claim pending MUSD rewards
     */
    function claimRewards() external nonReentrant {
        uint256 pendingAmount = userRewards[msg.sender].pendingMUSD;
        require(pendingAmount > 0, "No rewards to claim");
        
        userRewards[msg.sender].pendingMUSD = 0;
        userRewards[msg.sender].claimedMUSD += pendingAmount;
        userRewards[msg.sender].lastClaimTime = block.timestamp;
        
        require(musdToken.transfer(msg.sender, pendingAmount), "Transfer failed");
        
        emit RewardsClaimed(msg.sender, pendingAmount);
    }
    
    /**
     * @dev Check and process level up
     */
    function _checkLevelUp(address user) internal {
        uint256 totalPoints = userRewards[user].totalEarned;
        uint256 newLevel = _calculateLevel(totalPoints);
        
        if (newLevel > userRewards[user].level) {
            userRewards[user].level = newLevel;
            emit LevelUp(user, newLevel);
        }
    }
    
    /**
     * @dev Calculate level based on total points
     */
    function _calculateLevel(uint256 points) internal pure returns (uint256) {
        if (points >= 10000) return 10;
        if (points >= 5000) return 9;
        if (points >= 2500) return 8;
        if (points >= 1500) return 7;
        if (points >= 1000) return 6;
        if (points >= 500) return 5;
        if (points >= 250) return 4;
        if (points >= 100) return 3;
        if (points >= 50) return 2;
        return 1;
    }
    
    /**
     * @dev Get user rewards data
     */
    function getUserRewards(address user) external view returns (
        uint256 points,
        uint256 pendingMUSD,
        uint256 claimedMUSD,
        uint256 totalEarned,
        uint256 level
    ) {
        UserRewards memory rewards = userRewards[user];
        return (
            rewards.points,
            rewards.pendingMUSD,
            rewards.claimedMUSD,
            rewards.totalEarned,
            rewards.level
        );
    }
    
    /**
     * @dev Check if challenge is completed
     */
    function isChallengeCompleted(address user, string calldata challengeId) external view returns (bool) {
        return completedChallenges[user][challengeId];
    }
    
    /**
     * @dev Add or update challenge (owner only)
     */
    function setChallenge(
        string calldata id,
        string calldata title,
        uint256 pointsReward,
        bool isActive
    ) external onlyOwner {
        challenges[id] = Challenge(id, title, pointsReward, isActive);
    }
    
    /**
     * @dev Withdraw tokens (owner only, for emergency)
     */
    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
}
