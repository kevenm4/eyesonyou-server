const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.post(
  "/user/:id/post",
  fileUploader.single("postImage"),
  isAuthenticated,
  (req, res, next) => {
    const { title, description, Usercomments, author, imageUrl } = req.body;
    const { _id } = req.payload;

    Post.create({ title, description, Usercomments, author, imageUrl }).then(
      (createdPost) => {
        return User.findByIdAndUpdate(
          _id,
          {
            $push: { Posts: createdPost._id },
          },
          { new: true }
        )

          .then((createdPost) => {
            res.status(200).json(createdPost);
          })
          .catch(() => res.status(400).json({ message: "Error adding Post" }));
      }
    );
  }
);
router.get("/post", (req, res, next) => {
  Post.find()
    .populate("Usercomments")
    .populate("author")
    .then((response) => res.status(200).json(response))
    .catch(() => res.status(400).json({ message: "Post don't find" }));
});
router.delete("/post/:postId", isAuthenticated, (req, res, next) => {
  const { postId } = req.params;
  Post.findByIdAndRemove(postId)
    .then((response) => res.json(response))
    .catch((err = res.status(400).json({ message: "Invalid post supplied" })));
});

module.exports = router;
