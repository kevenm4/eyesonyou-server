const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.get("/user/:username", isAuthenticated, (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .populate("friends")
    .populate("comments")
    .populate("Posts")
    .populate("Events")
    .then((userFromDB) => res.status(200).json(userFromDB))
    .catch((err) => res.status(400).json({ message: "User not found!!" }));
});
router.get("/user/:username/friends", isAuthenticated, (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .populate("friends")
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => res.status(400).json({ message: "Friends not found!" }));
});

router.put(
  "/user/:userId",
  isAuthenticated,
  fileUploader.single("userImage"),
  (req, res, next) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;
    if (req.file) {
      User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
          imageUrl: req.file.path,
        },
        { new: true }
      )
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json({ message: "No user updated" }));
    } else {
      User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
        },
        { new: true }
      )

        .then((response) => res.json(response))
        .catch((err) => res.status(400).json({ message: "No user updated" }));
    }
  }
);

module.exports = router;
