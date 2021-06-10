const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  //   res.sendFile(__dirname + "/index.html");
  res.status(400).send("Bad request. Only wss:// protocol supported.");
});

app.get("/console/external", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:${port}`);
});
