const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { loadPlanets } = require("./models/planets.model");

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready!");
});
mongoose.connection.once("error", (err) => {
  console.error(err);
});
const MONGO_URL =
  "mongodb+srv://Nasa:RLQhm1mtBGR1STi4@nasa.eaznwhh.mongodb.net/?retryWrites=true&w=majority";
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
startServer();
