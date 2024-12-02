//require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
//require("@nomicfoundation/hardhat-chai-matchers")
//require("@nomiclabs/hardhat-etherscan")
/** @type import('hardhat/config').HardhatUserConfig */
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL =process.env.SEPOLIA_RPC_URL ||"https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"
const PRIVATE_KEY =process.env.PRIVATE_KEY ||"0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
module.exports = {
  paths: {
    sources: "./contracts", // Default path for contracts
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  defaultNetwork: "hardhat",
  networks:{
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },

    sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
    },
  },
  solidity: {
        compilers: [
            {
                version: "0.8.27",
            },
            {
                version: "0.8.0",
            },
        ],
  },
  etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
  gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token:"MATIC"
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deploye // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  sourcify: {
    enabled: true
  }
}
