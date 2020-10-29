const express = require("express");
const router = express.Router();
const User = require("../Models/Vote");
const ip = require("ip");

router.get("/", async (req, res) => {
  const data = await User.find({});
  //console.log(data);

  const voting = data.map((item) => {
    return {
      vote: item.vote,
    };
  });

  const totalVotes = voting.length;

  const android = voting.filter((item) => {
    return item.vote === "Android";
  }).length;

  const windows = voting.filter((item) => {
    return item.vote === "Windows";
  }).length;

  const linux = voting.filter((item) => {
    return item.vote === "Linux";
  }).length;

  const macOS = voting.filter((item) => {
    return item.vote === "MacOS";
  }).length;

  const ios = voting.filter((item) => {
    return item.vote === "Ios";
  }).length;

  res.status(200).send({
    totalVotes,
    android,
    ios,
    macOS,
    linux,
    windows,
  });
});

router.post("/", async (req, res) => {
  const vote = req.body.os;
  console.log(`Vote: ${vote}`);
  const userIP = await ip.address();
  console.log(userIP);

  const newVote = new User({
    vote: vote,
    ipAddress: userIP,
  });

  const checkIP = await User.find({ ipAddress: userIP });
  //console.log(checkIP);

  //If this is not a unqiue IP(user voted before!)
  if (checkIP.length !== 0) {
    console.log("already voted");
    res.status(406).send({
      msg: "You have already voted before!",
    });
    //if this is a unique IP(new voter!)
  } else {
    const voted = await newVote.save();
    console.log("vote saved!");
    res.status(200).send({ result: "voted!" });
  }
});

router.get("/error", (req, res) => {
  res.send("Server Error. Please try again!");
});

module.exports = router;
