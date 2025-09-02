module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("chatMessage", (msg) => {
      io.emit("chatMessage", msg);
    });

    
    socket.on("typing", (username) => {
      socket.broadcast.emit("typing", username);
    });

  
    socket.on("stopTyping", (username) => {
      socket.broadcast.emit("stopTyping", username);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
