const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TrackFarmModule", (m) => {
  const trackfarm = m.contract("TrackFarm");
  return { trackfarm };
});
