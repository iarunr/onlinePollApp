module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Connected to Server!");

    socket.broadcast.emit("user-connected", {
      msg: "new User connected!",
    });

    socket.on("user-voted", (data) => {
      console.log(data);
      socket.broadcast.emit("vote-complete", {
        vote: data.vote,
        total: data.total,
      });
    });
  });
};
