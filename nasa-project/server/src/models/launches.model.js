const launches = new Map();
let latestFlightNumber = 100;
const launch = {
  mission: "Kelpler Exploration X",
  rocket: "Explore IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kelpler-442 b",
  flightNumber: 100,
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
launches.set(launch.flightNumber, launch);
function getAllLaunches() {
  Array.from(launches.values());
}
function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      success: true,
      upcoming: true,
      customers: ["ZTM", "NASA"],
    })
  );
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
  launches,
  addNewLaunch,
  exitsLaunchWithId,
  abortLaunch,
};
