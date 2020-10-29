const express = require("express");
const router = express.Router();
const User = require("../Models/Vote");
const ip = require("ip");

router.get("/", (req, res) => {
  res.send("Polls");
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

router.get("/");

module.exports = router;
