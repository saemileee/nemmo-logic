const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  recommendation: { type: Number, default: 0 },
  avgTime: { type: Number, default: 0 },
  finishedCount: { type: Number, default: 0 },
  show: { type: Boolean, default: true, required: true },
});

module.exports = PostSchema;
