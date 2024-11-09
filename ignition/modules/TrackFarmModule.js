const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TrackFarmMod", (m) => {
  const trackfarm = m.contract("TrackFarm");
  return { trackfarm };
});
