const express = require("express");
const friendsController = require("../controllers/friends.controller");
const friendsRouter = express.Router();
friendsRouter.post("/", friendsController.createFriends);
friendsRouter.get("/", friendsController.getAllFriends);
friendsRouter.get("/:friendId", friendsController.getFriend);
module.exports = friendsRouter;
