const http = require("http");
const PORT = 5000;
const server = http.createServer();
const friends = [
  {
    id: 0,
    name: "Nikola Tesla",
  },
  {
    id: 1,
    name: "Sir Isaax",
  },
];
server.on("request", (req, res) => {
  const items = req.url.split("/");
  // /firends/2 => ['', 'friends', '2]
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log(`Request: ${friend}`);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method == "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      const friendIndex = friends.findIndex(
        (friend) => friend.id === Number(items[2])
      );
      if (friendIndex < 0) {
        res.statusCode = 404;
        res.end();
      }
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "/messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Isacc!</li>");
    res.write("<li>What are your thought on astronomy</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});
server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
}); //127.0.0.1 => localhost
