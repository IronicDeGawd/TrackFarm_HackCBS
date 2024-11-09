require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const AMOY_URL = process.env.AMOY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    amoy: {
      url: AMOY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

//cmd to deploy : npx hardhat ignition deploy ./ignition/modules/TrackFarmModule.js --network amoy
