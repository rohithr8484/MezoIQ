import { expect } from "chai";
import { ethers } from "hardhat";
import { MezoRewards, MockERC20 } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("MezoRewards", function () {
  let rewards: MezoRewards;
  let musdToken: MockERC20;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy mock MUSD token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    musdToken = await MockERC20.deploy("Mezo USD", "MUSD", 18);
    await musdToken.waitForDeployment();

    // Deploy rewards contract
    const MezoRewards = await ethers.getContractFactory("MezoRewards");
    rewards = await MezoRewards.deploy(await musdToken.getAddress());
    await rewards.waitForDeployment();

    // Fund rewards contract with MUSD
    await musdToken.mint(await rewards.getAddress(), ethers.parseEther("10000"));
  });

  describe("Points System", function () {
    it("Should allow owner to award points", async function () {
      await rewards.earnPoints(user1.address, 100, "test action");
      
      const userRewards = await rewards.getUserRewards(user1.address);
      expect(userRewards.points).to.equal(100);
      expect(userRewards.totalEarned).to.equal(100);
    });

    it("Should track level progression", async function () {
      await rewards.earnPoints(user1.address, 500, "big action");
      
      const userRewards = await rewards.getUserRewards(user1.address);
      expect(userRewards.level).to.equal(5);
    });

    it("Should emit PointsEarned event", async function () {
      await expect(rewards.earnPoints(user1.address, 50, "test"))
        .to.emit(rewards, "PointsEarned")
        .withArgs(user1.address, 50, "test");
    });
  });

  describe("Challenges", function () {
    it("Should allow completing challenges", async function () {
      await rewards.connect(user1).completeChallenge("1");
      
      const isCompleted = await rewards.isChallengeCompleted(user1.address, "1");
      expect(isCompleted).to.be.true;
    });

    it("Should award points for completing challenges", async function () {
      await rewards.connect(user1).completeChallenge("1"); // Daily Login = 10 points
      
      const userRewards = await rewards.getUserRewards(user1.address);
      expect(userRewards.points).to.equal(10);
    });

    it("Should prevent completing same challenge twice", async function () {
      await rewards.connect(user1).completeChallenge("1");
      
      await expect(rewards.connect(user1).completeChallenge("1"))
        .to.be.revertedWith("Challenge already completed");
    });

    it("Should emit ChallengeCompleted event", async function () {
      await expect(rewards.connect(user1).completeChallenge("1"))
        .to.emit(rewards, "ChallengeCompleted")
        .withArgs(user1.address, "1", 10);
    });
  });

  describe("Cashback", function () {
    it("Should process cashback correctly", async function () {
      const purchaseAmount = ethers.parseEther("100");
      await rewards.processCashback(user1.address, purchaseAmount);
      
      const userRewards = await rewards.getUserRewards(user1.address);
      // 2% of 100 = 2
      expect(userRewards.pendingMUSD).to.equal(ethers.parseEther("2"));
    });
  });

  describe("Claiming Rewards", function () {
    beforeEach(async function () {
      // Give user some pending rewards
      await rewards.processCashback(user1.address, ethers.parseEther("100"));
    });

    it("Should allow claiming pending rewards", async function () {
      const initialBalance = await musdToken.balanceOf(user1.address);
      
      await rewards.connect(user1).claimRewards();
      
      const finalBalance = await musdToken.balanceOf(user1.address);
      expect(finalBalance - initialBalance).to.equal(ethers.parseEther("2"));
    });

    it("Should update claimed amount", async function () {
      await rewards.connect(user1).claimRewards();
      
      const userRewards = await rewards.getUserRewards(user1.address);
      expect(userRewards.pendingMUSD).to.equal(0);
      expect(userRewards.claimedMUSD).to.equal(ethers.parseEther("2"));
    });

    it("Should revert if no rewards to claim", async function () {
      await expect(rewards.connect(user2).claimRewards())
        .to.be.revertedWith("No rewards to claim");
    });
  });

  describe("Access Control", function () {
    it("Should only allow owner to award points", async function () {
      await expect(rewards.connect(user1).earnPoints(user2.address, 100, "test"))
        .to.be.revertedWithCustomError(rewards, "OwnableUnauthorizedAccount");
    });

    it("Should only allow owner to process cashback", async function () {
      await expect(rewards.connect(user1).processCashback(user2.address, 100))
        .to.be.revertedWithCustomError(rewards, "OwnableUnauthorizedAccount");
    });
  });
});
