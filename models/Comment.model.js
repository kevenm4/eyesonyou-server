const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  Author: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
