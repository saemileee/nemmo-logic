const mongoose = require("mongoose");
// const id = require("./types/short-id");
const { Schema } = mongoose;
const Counter = require("./counter");

const PostSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: { type: String, required: true },
  answer: { type: Array, required: true },
  status: { type: Boolean },
  size: { type: String, required: true },
  recommendation: { type: Number },
  avgTime: { type: Number },
  finishedCount: { type: Number },
  show: { type: Boolean },
});

module.exports = PostSchema;
