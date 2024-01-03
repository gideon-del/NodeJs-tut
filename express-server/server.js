const express = require("express");

const friendsRouter = require("./routes/friends.router");
const messageRouter = require("./routes/messages.router");
const app = express();
const path = require("path");
const PORT = 5000;
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});
app.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "My Friends are very clever",
    caption: "Let's go Skying",
  });
});
app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/friends", friendsRouter);
app.use("/messages", messageRouter);
app.listen(PORT, () => {
  console.log("Listening on Port " + PORT);
});
