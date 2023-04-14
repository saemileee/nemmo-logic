const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/public", express.static(path.join(__dirname, "../public")));
router.use(
  "/components",
  express.static(path.join(__dirname, "../components"))
);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/posts/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = router;
