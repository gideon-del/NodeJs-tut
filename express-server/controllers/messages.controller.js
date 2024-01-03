const path = require("path");
function getMessages(req, res) {
  // res.send("<ul><li>Hello Albert!</li></ul>");
  // res.sendFile(
  //   path.join(__dirname, "..", "public", "images", "skimountain.jpg")
  // );
  res.render("messages", {
    title: "Message to my Friend",
    friend: "Elon Musk",
  });
}
function postMessages(req, res) {
  console.log("Updating messages");
}

module.exports = {
  getMessages,
  postMessages,
};
