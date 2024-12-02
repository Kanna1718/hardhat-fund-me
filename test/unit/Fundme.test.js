const { deployments,ethers,getNamedAccounts }=require("hardhat")
const { assert,expect }=require("chai")
const { networkConfig, developmentChain }=require("../../helper-hardhat-config")
require("dotenv").config()

!developmentChain.includes(network.name)
    ? describe.skip
    :describe("Fundme",async function() {
    let fundme
    let deployer
    let MockV3Aggregator
    const sendvalue=ethers.utils.parseEther("1")
    beforeEach(async function() {
        await deployments.fixture(["all"])
        deployer = (await getNamedAccounts()).deployer
        const fundmeDeployment = await deployments.get("Fundme");
        fundme = await ethers.getContractAt("Fundme", fundmeDeployment.address);
        MockV3Aggregator = await deployments.get("MockV3Aggregator");
        //console.log("Fundme contract address:", fund.address,"/n",fundmeDeployment.address);

    })
    describe("constructor",async function() {
        it("sets aggregrator ",async function() {
            const response = await fundme.getPriceFeed()
            //
            const address=await MockV3Aggregator.address
            console.log(address)
            assert.equal(response,address)
        })
    })
    describe("fund",async function() {
        it("fail of not enough eth",async function() {
            await expect(fundme.fund()).to.be.revertedWith(
            "You need to spend more ETH!"
            )
        })
        it("update a amount funded data ",async function () {
            await fundme.fund({value:sendvalue})
            const response = await fundme.getAddressToAmountFunded(deployer)
            assert.equal(response.toString(),sendvalue.toString())
        })
        it("checking funder adds funder",async function () {
            await fundme.fund({value:sendvalue})
            const reponse =await fundme.funders(0)
            assert.equal(reponse.toString(),deployer)
        })
    })
    describe("withdraw",async function () {
        this.beforeEach(async function () {
            await fundme.fund({value:sendvalue})
        })
        it("withdraw ETH from a single founder",async function () {
            //arange
            const startingFundmeBalance = await fundme.provider.getBalance(fundme.address)
            const startingDeployerBalance = await fundme.provider.getBalance(deployer)
            //act
            const transactionResponse = await fundme.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            //assert
            const {gasUsed, effectiveGasPrice} = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingFundmeBalance = await fundme.provider.getBalance(fundme.address)
            const endingDeployerBalance = await fundme.provider.getBalance(deployer)
            assert.equal(endingFundmeBalance,0)
            assert.equal(startingDeployerBalance.add(startingFundmeBalance).toString,endingDeployerBalance.add(gasCost).toString)
        })
        it("allows us to withdraw with multiple funders",async function() {
            const account=await ethers.getSigners()
            for(let i=1;i<6;i++){
                const fundmeconnectcontract=await fundme.connect(account[i])
                await fundmeconnectcontract.fund({value:sendvalue})
            }
            const startingFundmeBalance = await fundme.provider.getBalance(fundme.address)
            const startingDeployerBalance = await fundme.provider.getBalance(deployer)

            const transactionResponse = await fundme.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            //assert
            const {gasUsed, effectiveGasPrice} = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingFundmeBalance = await fundme.provider.getBalance(fundme.address)
            const endingDeployerBalance = await fundme.provider.getBalance(deployer)

            assert.equal(endingFundmeBalance,0)
            assert.equal(startingDeployerBalance.add(startingFundmeBalance).toString,endingDeployerBalance.add(gasCost).toString)

            await expect(fundme.funders(0)).to.be.reverted

                  for (i = 1; i < 6; i++) {
                      assert.equal(await fundme.getAddressToAmountFunded(account[i].address),0)
                }
        })
        it("Only allows the owner to withdraw", async function () {
            const accounts = await ethers.getSigners()
            console.log(sendvalue)
            const fundMeConnectedContract = await fundme.connect(
                accounts[1]
            )
            await expect(
                fundMeConnectedContract.withdraw()
            ).to.be.revertedWith("NotOwner")
        })
    })
    })