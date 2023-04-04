const express = require("express");
const router = express.Router();

router.get("/:puzzleId", (req, res, next) => {
  const { puzzleId } = req.params;
  res.send(puzzleId);
});

module.exports = router;
