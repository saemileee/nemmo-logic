const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res
    .set({
      "Content-Type": "text/html",
    })
    .sendFile(path.join(__dirname, "../public/puzzlemaker.html"));
});

module.exports = router;
