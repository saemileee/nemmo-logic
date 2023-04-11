const mongoose = require("mongoose");
const id = require("./types/short-id");
const { Schema } = mongoose;

const PostSchema = new Schema({
  id,
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
