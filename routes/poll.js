const express = require("express");
const router = express.Router();
const User = require("../Models/Vote");
const ip = require("ip");

router.get("/", (req, res) => {
  res.send("Polls");
});

router.post("/", async (req, res) => {
  const vote = req.body.OS;
  const userIP = await ip.address();

  const newVote = new User({
    vote: vote,
    ipAddress: Number(userIP),
  });

  res.redirect("/");
});

module.exports = router;
