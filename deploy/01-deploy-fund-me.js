const { network } = require("hardhat");
const { networkConfig, developmentChain }=require("../helper-hardhat-config")
require("dotenv").config()
const { verify }=require("../utils/verify")

module.exports= async ({ getNamedAccounts, deployments }) => {
    const { deploy, log }=deployments
    const { deployer } =await getNamedAccounts()
    const chainId = network.config.chainId
    let ethusdaddress
    if(developmentChain.includes(network.name)){
        const ethusdaggregator=await deployments.get("MockV3Aggregator")
        ethusdaddress =ethusdaggregator.address
    }
    else{
        ethusdaddress=networkConfig[chainId]["ethusdPriceFeed"]
    }
    //const 
    const fundme = await deploy("Fundme",{
        from:deployer,
        args:[ethusdaddress],
        log : true,
        waitConfirmations: network.config.blockConfirmations || 1

    })
    if(!developmentChain.includes(network.name)&&process.env.ETHERSCAN_API_KEY){
        await verify(fundme.address,[ethusdaddress])
    }
    log("---------------------------------------------------------------------")
}
module.exports.tags=["all","Fundme"]