import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy MUSD Token (for testing - replace with actual MUSD address on mainnet)
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const musdToken = await MockERC20.deploy("Mezo USD", "MUSD", 18);
  await musdToken.waitForDeployment();
  const musdAddress = await musdToken.getAddress();
  console.log("MUSD Token deployed to:", musdAddress);

  // Deploy tBTC Token (for testing - replace with actual tBTC address on mainnet)
  const tbtcToken = await MockERC20.deploy("Test Bitcoin", "tBTC", 8);
  await tbtcToken.waitForDeployment();
  const tbtcAddress = await tbtcToken.getAddress();
  console.log("tBTC Token deployed to:", tbtcAddress);

  // Deploy Rewards Contract
  const MezoRewards = await ethers.getContractFactory("MezoRewards");
  const rewards = await MezoRewards.deploy(musdAddress);
  await rewards.waitForDeployment();
  const rewardsAddress = await rewards.getAddress();
  console.log("MezoRewards deployed to:", rewardsAddress);

  // Deploy Marketplace Contract
  const MezoMarketplace = await ethers.getContractFactory("MezoMarketplace");
  const marketplace = await MezoMarketplace.deploy(
    musdAddress,
    tbtcAddress,
    rewardsAddress
  );
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("MezoMarketplace deployed to:", marketplaceAddress);

  // Verification info
  console.log("\n=== Deployment Summary ===");
  console.log("Network: Mezo Mainnet (Chain ID: 31612)");
  console.log("MUSD Token:", musdAddress);
  console.log("tBTC Token:", tbtcAddress);
  console.log("MezoRewards:", rewardsAddress);
  console.log("MezoMarketplace:", marketplaceAddress);
  
  console.log("\n=== Update these addresses in src/contracts/addresses.ts ===");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
