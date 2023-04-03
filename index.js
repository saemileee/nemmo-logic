const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.sendFile("./index.html");
  // res.sendFile(__dirname + "/index.html");
});

app.get("/post-puzzle", (req, res) => {
  res.sendFile(__dirname + "/public/puzzlemaker.html");
});

app.get("/puzzle/:id", (req, res) => {
  res.json("./package.json");
});

app.use(express.static("public"));
app.use(express.static("src"));

const fs = require("fs");

function putPuzzleData(puzzle) {
  const puzzleDB = fs.readFileSync("/public/puzzle.json");
  const puzzleDBJSON = puzzleDB.toString();
  const puzzleData = JSON.parse(puzzleDBJSON);
  console.log(puzzleData);

  // const bookJSON = JSON.stringify(test);
  // fs.writeFileSync("test.json", bookJSON);
}

app.listen(8080);
