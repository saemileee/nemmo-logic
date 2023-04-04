const express = require("express");
const app = express();
const puzzleMakerRouter = require("./routes/puzzleMaker");
const puzzlePostRouter = require("./routes/posts");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/create-puzzle", puzzleMakerRouter);

app.use("/puzzle", puzzlePostRouter);

app.listen(8080);
