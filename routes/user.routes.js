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
// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
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
  console.log(username);
  User.find({ $regex: username, $options: "i" })
    .populate("friends")
    .populate("Posts")
    .populate("Events")
    .then((userFromDB) => res.status(200).json(userFromDB))
    .catch((err) => res.status(400).json({ message: "User not found!!" }));
});

router.put("/user", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { username, sport, team,imageUrl} = req.body;
  User.findByIdAndUpdate(
    _id,
    {
      username,
      sport,
      team,
      imageUrl
    },
    { new: true }
  )

    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: "No user updated" }));
});
router.delete("/user", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  User.findByIdAndDelete(_id)
    .then(() => res.status(204).send())
    .catch((err) => res.status(400).json({ message: "Invalid user supplied" }));
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
