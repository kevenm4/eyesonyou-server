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
    const { title, description, imageUrl } = req.body;
    const { _id } = req.payload;

    Post.create({ title, description, author: _id, imageUrl }).then(
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
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});
router.get("/post", isAuthenticated, (req, res, next) => {
  Post.find()
    .populate("Usercomments")
    .populate("author")
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Post don't find" });
    });
});
router.delete("/post/:postId", isAuthenticated, (req, res, next) => {
  const { postId } = req.params;
  Post.findByIdAndRemove(postId)
    .then((response) => res.json(response))
    .catch((err = res.status(400).json({ message: "Invalid post supplied" })));
});

module.exports = router;
