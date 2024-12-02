const { assert } = require("chai")
const { network, ethers, getNamedAccounts } = require("hardhat")
const { networkConfig, developmentChain }=require("../../helper-hardhat-config")
//require("dotenv").config()

developmentChain.includes(network.name)
    ? describe.skip
    :describe("fundme staging test",async function () {
        let deployer
        let fundme
        const sendvalue=ethers.utils.parseEther("1")
        beforeEach(async function () {
            //deployer = (await getNamedAccounts()).deployer;

            // Validate the contract address
            //const contractAddress = ethers.utils.getAddress("0x374bd05607F9B129AA1d79Dc680CF8e61eb49bdac");
            //console.log(`Validated Contract Address: ${contractAddress}`);
        
            //const accounts = await ethers.getSigners();   
            //const { deployer: deployerAddress } = await getNamedAccounts();
            //deployer = await ethers.getSigner(deployerAddress); 
            const signer = await ethers.getSigner();
            fundme = await ethers.getContractAt("Fundme","0x374bd05607F9B129AA1d79Dc680CF8e61eb49bda",signer);
        })
        it("test fund and withdraw function",async function () {
            const fund=await fundme.fund({value:sendvalue, gasLimit: 100000, // Specify gas limit
                gasPrice: ethers.utils.parseUnits("10", "gwei"),})
            await fund.wait()
            const withdraw=await fundme.withdraw()
            await withdraw.wait()
            const accountBalance=await ethers.provider.getBalance(deployer.address)
            console.log(`Total balance of Owner account ${accountBalance}`)
            const endingfundmeBalance=await ethers.provider.getBalance(fundme.address)
            console.log(`Total balance of Owner account ${endingfundmeBalance}`)
            assert(endingfundmeBalance.toString(),"0")
        })
    })

   // module.exports.tags=["all","staging"]