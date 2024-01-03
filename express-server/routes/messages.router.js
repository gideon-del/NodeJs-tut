const express = require("express");
const messagesControler = require("../controllers/messages.controller");
const messageRouter = express.Router();
messageRouter.post("/", messagesControler.postMessages);
messageRouter.get("/", messagesControler.getMessages);
module.exports = messageRouter;
