const express = require("express");
const puzzlesRouter = require("./routes/puzzles");
const app = express();

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/puzzles", puzzlesRouter);

app.listen(process.env.PORT || 8080, () => console.log("Listening on 8080"));
