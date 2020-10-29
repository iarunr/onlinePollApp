const express = require("express");
const router = express.Router();
const User = require("../Models/Vote");

router.get("/", (req, res) => {
  res.send("Polls");
});

router.post("/", (req, res) => {
  const vote = req.body.OS;
  console.log(vote);
  res.redirect("/");
});

module.exports = router;
