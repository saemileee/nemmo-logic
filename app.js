const express = require("express");
const mongoose = require("mongoose");
const puzzlesRouter = require("./routes/puzzles");
const app = express();
const { Post } = require("./models");

mongoose.connect(
  "***REMOVED***",
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

app.use("/public", express.static(__dirname + "/public"));
app.use("/components", express.static(__dirname + "/components"));

// 데이터 조회 함수
async function getPosts() {
  const posts = await Post.find({});
  return posts;
}

// 데이터 조회 API
app.get("/api/data", async (req, res) => {
  try {
    const posts = await getPosts();
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/puzzles", puzzlesRouter);

app.listen(process.env.PORT || 8000, () => console.log("Server running..."));
