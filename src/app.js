const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const chatController = require("../controllers/controllers");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

chatController(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
