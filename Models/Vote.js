const mongoose = require("mongoose");

const UserVote = new mongoose.Schema({
  vote: { type: String, required: true },
  ipAddress: { type: String, required: true },
  vote_Date: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserVote);

module.exports = User;
