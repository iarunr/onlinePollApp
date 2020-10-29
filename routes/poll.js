const express = require("express");
const router = express.Router();
const User = require("../Models/Vote");
const ip = require("ip");

router.get("/", async (req, res) => {
  const data = await User.find({});
  console.log(data);

  const voting = data.map((item) => {
    return {
      vote: item.vote,
    };
  });

  const totalVotes = voting.length;

  const android = voting.filter((item) => {
    return item.vote === "Android";
  });

  const windows = voting.filter((item) => {
    return item.vote === "Windows";
  });

  const linux = voting.filter((item) => {
    return item.vote === "Linux";
  });

  const macOS = voting.filter((item) => {
    return item.vote === "MacOS";
  });

  const ios = voting.filter((item) => {
    return item.vote === "Ios";
  });
});

router.post("/", async (req, res) => {
  const vote = req.body.os;
  console.log(vote);
  const userIP = await ip.address();
  console.log(userIP);

  const newVote = new User({
    vote: vote,
    ipAddress: userIP,
  });

  const voted = await newVote.save();
  console.log("vote saved!");

  res.send({ result: "voted!" });
});

module.exports = router;
