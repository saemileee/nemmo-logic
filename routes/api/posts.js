const express = require("express");
const router = express.Router();
const { Post } = require("../../models");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    // 요청 본문에서 퍼즐 정보를 추출합니다.
    const {
      id,
      title,
      answer,
      status,
      size,
      recommendation,
      avgTime,
      finishedCount,
      show,
    } = req.body;

    // 새로운 퍼즐 객체를 생성합니다.
    const newPost = await Post.create({
      id,
      title,
      answer,
      status,
      size,
      recommendation,
      avgTime,
      finishedCount,
      show,
    });
    res.redirect(`/puzzles/${newPost.id}`);
  } catch (err) {
    console.error(err);
    // 오류 응답을 반환합니다.
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:puzzleId", async (req, res) => {
  const { puzzleId } = req.params;
  const post = await Post.findOne({ id: puzzleId });
  res.json(post);
});

module.exports = router;
