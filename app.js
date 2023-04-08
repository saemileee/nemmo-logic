const express = require("express");

const app = express();

const puzzlesRouter = require("./routes/puzzles");

app.use("/public", express.static(__dirname + "/public"));
app.use("/components", express.static(__dirname + "/components"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/puzzles", puzzlesRouter);

app.listen(process.env.PORT || 8000, () => console.log("Server running..."));
