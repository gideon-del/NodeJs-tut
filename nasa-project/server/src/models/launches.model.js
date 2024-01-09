const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();
const DEFEAULT_FLIGH_NUMBER = 100;
const launch = {
  mission: "Kelpler Exploration X",
  rocket: "Explore IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-296 A f",
  flightNumber: 100,
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
saveLaunch(launch);
// launches.set(launch.flightNumber, launch);
async function getAllLaunches() {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}
async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No Match planet found");
  }
  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
async function addNewLaunch(launch) {}
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFEAULT_FLIGH_NUMBER;
  }
  return latestLaunch.flightNumber;
}
function exitsLaunchWithId(launchId) {
  return launches.has(launchId);
}
function abortLaunch(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
module.exports = {
  getAllLaunches,
  addNewLaunch,
  exitsLaunchWithId,
  abortLaunch,
};
