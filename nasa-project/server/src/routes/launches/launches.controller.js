const {
  launches,
  addNewLaunch,
  exitsLaunchWithId,
  abortLaunch,
} = require("../../models/launches.model");
function getAllLaunches(req, res) {
  return res.status(200).json(Array.from(launches.values()));
}
function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!exitsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = abortLaunch(launchId);

  return res.status(200).json(aborted);
}
module.exports = {
  getAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
};
