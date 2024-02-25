const hre = require("hardhat")
import { ethers } from "hardhat"

async function main() {
  const [owner, addr1, addr2, addr3] = await ethers.getSigners()

  for (let i = 1; i <= 1; i++) {
    let ERC425 = await hre.ethers.getContractFactory("PARADOX")
    ERC425 = await ERC425.deploy("MyToken", "MTK", 18, 10000, "", addr3)
    ERC425 = await ERC425.waitForDeployment()

    let OTHER_HYBRID = await hre.ethers.getContractFactory("ERCX")
    OTHER_HYBRID = await OTHER_HYBRID.deploy("", "MyToken", "MTK", 18, 10000, 1)
    OTHER_HYBRID = await OTHER_HYBRID.waitForDeployment()

    const blocksToMine = 50
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send("evm_mine", [])
    }

    console.log("========")
    console.log("buy loop:", i)

    let erc425_buy = await ERC425.transfer(addr1, 36n * 10n ** 18n)
    console.log(
      "ERC425 Gas Units",
      (await erc425_buy.wait()).gasUsed.toString(),
    )

    let other_hybrid_buy = await OTHER_HYBRID.transfer(addr1, 36n * 10n ** 18n)
    console.log(
      "Other Hybrid Gas Units",
      (await other_hybrid_buy.wait()).gasUsed.toString(),
    )
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
