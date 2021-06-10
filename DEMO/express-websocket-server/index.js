const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      /\.corruptedpixl\.com$/,
      /\.cpixl\.com$/,
      /\.pxl\.zone$/,
      /\.pxl\.rip$/,
      /\.\.com$/,
      /\.samuelvanhaecke\.com$/,
      /\.kenzodewaegenaere\.be$/,
    ],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res
    .status(400)
    .send(
      "Bad request. Only wss:// protocol supported. <br><img src='https://http.cat/400'></img>"
    );
});

app.get("/console/external", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("New connection");
  socket.on("consoleMessage", (msg) => {
    io.emit("consoleMessage", msg);
  });
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
