const { Schema } = require("mongoose");

const PuzzletSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    category: String,
  },
  {
    timestamps: true,
  }
);

module.exports = PostSchema;
