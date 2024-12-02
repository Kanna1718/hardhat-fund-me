const networkConfig={
    11155111:{
        name: "sepolia",
        ethusdPriceFeed : "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}
const developmentChain=["hardhat","localhost"]
const decimals=8
const intial_price=200000000000
module.exports={
    networkConfig,
    developmentChain,
    decimals,
    intial_price
}