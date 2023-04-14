const express = require("express");
const router = express.Router();
const { Post, Counter } = require("../../models");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const total = await Post.countDocuments({});
    const posts = await Post.find({})
      .sort({ id: 1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    const totalPage = Math.ceil(total / perPage);
    res.json({ posts, page, perPage, totalPage, total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//CREATE
router.post("/", async (req, res) => {
  try {
    const { title, answer, status, size, show } = req.body;

    const counter = await Counter.findOneAndUpdate(
      { _id: "post_id" },
      { $inc: { sequence_value: 1 } }
    );

    const newPost = await Post.create({
      id: counter.sequence_value,
      title,
      answer,
      status,
      size,
      show,
    });
    res.redirect(`/puzzles/${newPost.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//READ
router.get("/:puzzleId", async (req, res) => {
  const { puzzleId } = req.params;
  try {
    const post = await Post.findOne({ id: puzzleId });
    res.json(post);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

//UPDATE
router.get("/:puzzleId", async (req, res) => {
  const { puzzleId } = req.params;
  try {
    const { title, answer, status, size, show } = req.body;
    const post = await Post.findOneAndUpdate(
      { id: puzzleId },
      { title, answer, status, size, show }
    );
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

//DELETE
router.delete("/:puzzleId", async (req, res) => {
  const { puzzleId } = req.params;
  try {
    await Post.delete({ id: puzzleId });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
