const mongoose = require("mongoose");
const PostSchema = require("./schemas/post");
const CounterSchema = require("./schemas/counter");

exports.Post = mongoose.model("Post", PostSchema);
exports.Counter = mongoose.model("Counter", CounterSchema);
