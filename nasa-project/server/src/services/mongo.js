const mongoose = require("mongoose");
const MONGO_URL =
  "mongodb+srv://Nasa:RLQhm1mtBGR1STi4@nasa.eaznwhh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready!");
});
mongoose.connection.once("error", (err) => {
  console.error(err);
});
async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
