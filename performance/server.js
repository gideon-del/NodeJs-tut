const express = require("express");
const cluster = require("cluster");
const os = require("os");
const app = express();
function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // Event loop is  blocked
  }
}
console.log("Running server.js");
app.get("/", (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
  res.send(`Performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding Ding Ding: ${process.pid} `);
});

if (cluster.isMaster) {
  console.log("Master has been started " + process.pid);
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker process started " + process.pid);
  app.listen(3000);
}
