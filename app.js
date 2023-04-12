const express = require("express");
const mongoose = require("mongoose");
const puzzlesRouter = require("./routes/puzzles");
const postsAPIRouter = require("./routes/api/posts");

const app = express();

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

app.use("/public", express.static(__dirname + "/public"));
app.use("/components", express.static(__dirname + "/components"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/puzzles", puzzlesRouter);
app.use("/api/posts", postsAPIRouter);

app.listen(process.env.PORT || 8080, () => console.log("Server running..."));
