const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.post("/post/:id/comment", isAuthenticated, (req, res, next) => {
  const { text } = req.body;
  const { id } = req.params;
  const { _id } = req.payload;

  Comment.create({ Author: _id, text }).then((createdComment) => {
    return Post.findByIdAndUpdate(id, {
      $push: { Usercomments: createdComment._id },
    })
      .then((updatedPost) => {
        res.status(200).json(updatedPost);
      })
      .catch(() => res.status(400).json({ message: "Error adding comment" }));
  });
});

router.delete("/comment/:commentId", isAuthenticated, (req, res, next) => {
  const { commentId } = req.params;
  Comment.findByIdAndRemove(commentId)
    .then((response) => res.json(response))
    .catch(
      (err = res.status(400).json({ message: "Invalid comment supplied" }))
    );
});

module.exports = router;
