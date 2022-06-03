const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  imageUrl: {
    type: String,
  },

  title: { type: String },
  description: { type: String },
  Usercomments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Post = model("Post", postSchema);

module.exports = Post;
