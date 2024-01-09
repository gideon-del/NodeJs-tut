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
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "Nasa"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}
// async function addNewLaunch(launch) {}
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFEAULT_FLIGH_NUMBER;
  }
  return latestLaunch.flightNumber;
}
async function exitsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}
async function abortLaunch(id) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}
module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  exitsLaunchWithId,
  abortLaunch,
};
