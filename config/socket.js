module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Connected to Server!");

    socket.broadcast.emit("user-connected", {
      msg: "new User connected!",
    });
  });
};
