const express = require("express");
const router = express.Router();
const path = require("path");

// const puzzles = require("../public/puzzle.json");

router.use("/public", express.static(path.join(__dirname, "../public")));
router.use(
  "/components",
  express.static(path.join(__dirname, "../components"))
);

router.get("/:puzzleId", (req, res, next) => {
  // const { puzzleId } = req.params;
  // const puzzle = puzzles.find((puzzle) => (puzzle.id = puzzleId));
  // res.json(puzzle);
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = router;
