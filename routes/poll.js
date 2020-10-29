const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Polls");
});

router.post("/", (req, res) => {
  const vote = req.body.OS;
  console.log(vote);
  res.redirect("/");
});

module.exports = router;
