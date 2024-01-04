const launches = new Map();

const launch = {
  misson: "Kelpler Exploration X",
  rocket: "Explore IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kelpler-442 b",
  flightNumber: 100,
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
