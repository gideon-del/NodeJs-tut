const express = require("express");
const {
  getAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();
launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpDeleteLaunch);
module.exports = launchesRouter;
