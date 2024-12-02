const { ethers, getNamedAccounts,deployments } = require("hardhat")

async function main() {
  const { deployer } = await getNamedAccounts()
  const fundmeDeployment = await deployments.get("Fundme");
  const fundMe = await ethers.getContractAt("Fundme", fundmeDeployment.address);
  const startingDeployerBalanceDeployerBalance=await fundMe.provider.getBalance(fundMe.address)
  const withdraw = await fundMe.withdraw()
  await withdraw.wait()
  const endingDeployerBalance=await ethers.provider.getBalance(fundMe.address)
  console.log(`ETH before transaction ${startingDeployerBalanceDeployerBalance} \n Withdrawal was successful, final balance is ${endingDeployerBalance}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })