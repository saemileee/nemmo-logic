const { Schema } = require("mongoose");

const PostSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  answer: { type: Array, require: true },
  status: { type: Boolean },
  size: { type: String, required: true },
  recommendation: { type: Number },
  avgTime: { type: Number },
  finishedCount: { type: Number },
  show: { type: Boolean, required: true },
});

module.exports = PostSchema;
