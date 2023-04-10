const express = require("express");
const router = express.Router();
const path = require("path");
const { Post } = require("../models/index");

// async function main() {
//   const posts = await Post.find({});
//   return posts;
// }
// main().then((posts) => {
//   console.log("---검색 결과---");
//   console.log(posts);
//   console.log("---------------");
//   return;
// });

router.use("/public", express.static(path.join(__dirname, "../public")));
router.use(
  "/components",
  express.static(path.join(__dirname, "../components"))
);

router.get("/:puzzleId", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/post", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = router;
