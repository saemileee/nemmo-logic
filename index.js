const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/post-puzzle", (req, res) => {
  res.sendFile(__dirname + "/public/puzzlemaker.html");
});

app.use(express.static(__dirname + "public"));
app.use(express.static(__dirname + "src"));

app.use("/allMethod", (req, res) => {
  res.send("allMethod");
});

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
