require("dotenv").config();
const { PORT, MONGO_URI } = process.env;

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const puzzlesRouter = require("./routes/puzzles");
const postsAPIRouter = require("./routes/api/puzzles");

const app = express();

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

// app.set("trust proxy", true);

app.use("/public", express.static(__dirname + "/public"));
app.use("/components", express.static(__dirname + "/components"));

app.get("/", (req, res) => {
  res.redirect("/puzzles");
});

app.use("/puzzles", puzzlesRouter);
app.use("/api/puzzles", postsAPIRouter);

app.listen(PORT || 4000, () => console.log("Server running..."));
