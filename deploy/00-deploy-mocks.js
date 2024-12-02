const { network }=require("hardhat")
const { developmentChain,decimals,intial_price }= require("../helper-hardhat-config")
const { Contract } = require("ethers")

module.exports= async ({ getNamedAccounts, deployments }) => {
    const { deploy, log }=deployments
    const { deployer } =await getNamedAccounts()
    //const chainId = network.config.chainId
    //const name =networkConfig[chainId]["name"]

    if (developmentChain.includes(network.name)){
        log("localnetwork network identified ")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [decimals,intial_price]
        })
        log("mocks deployed")
        log("---------------------------------------------------------------")
    }
}
module.exports.tags=["all","mocks"]