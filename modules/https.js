const { send } = require("./request");
// import { send } from "./request.mjs";
const { read } = require("./response");
// import { read } from "./response.mjs";
function request(url, data) {
  send(url, data);
  return read();
}

console.log(request("https://google.com", "Hello"));
