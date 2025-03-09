// filepath: /Users/anikdas/Desktop/Devlearn_Educhain/dapp/scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CourseNFT contract...");
  
  const CourseNFT = await ethers.getContractFactory("CourseNFT");
  const courseNFT = await CourseNFT.deploy();
  
  await courseNFT.waitForDeployment();
  
  console.log(`CourseNFT deployed to: ${await courseNFT.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });