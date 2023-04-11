const express = require("express");
const mongoose = require("mongoose");
const puzzlesRouter = require("./routes/puzzles");
const app = express();
const { Post } = require("./models");

//
mongoose.connect(
  "***REMOVED***
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));
app.use("/components", express.static(__dirname + "/components"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/puzzles", puzzlesRouter);

// 데이터 조회 API
app.get("/api/data", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/data", async (req, res) => {
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

app.listen(process.env.PORT || 8080, () => console.log("Server running..."));
