const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.get("/user/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate("Posts")
    .populate("Events")
    .populate("friends")
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "User not found!!" });
    });
});

router.put("/user/:friendId/join", isAuthenticated, (req, res, next) => {
  const { friendId } = req.params;
  const { _id } = req.payload;
  User.findByIdAndUpdate(_id, {
    $push: { friends: friendId },
  })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json({ message: "error" }));
});
router.post("/user/search", isAuthenticated, (req, res, next) => {
  const { username } = req.body;
  User.find({ username })
    .populate("friends")
    .populate("Posts")
    .populate("Events")
    .then((userFromDB) => res.status(200).json(userFromDB))
    .catch((err) => res.status(400).json({ message: "User not found!!" }));
});

router.put("/user", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { username, sport, team } = req.body;
  User.findByIdAndUpdate(
    _id,
    {
      username,
      sport,
      team,
    },
    { new: true }
  )

    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: "No user updated" }));
});
router.delete("/user", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  User.findByIdAndRemove(_id )
    .then((response) => res.json(response))
    .catch((err = res.status(400).json({ message: "Invalid user supplied" })));
});
router.get("/user", isAuthenticated, (req, res, next) => {
  User.find()
    .populate("friends")
    .populate("Posts")
    .populate("Events")
    .then((response) => res.status(200).json(response))
    .catch(() => res.status(400).json({ message: "user don't find" }));
});
module.exports = router;
