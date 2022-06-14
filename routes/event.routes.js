const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/event-create", isAuthenticated, (req, res, next) => {
  const { title, description, imageUrl } = req.body;
  const { _id } = req.payload;

  Event.create({ title, description, Author: _id, join: [], imageUrl })
    .then((createdevent) => {
      return User.findByIdAndUpdate(
        _id,
        {
          $push: { Events: createdevent._id },
        },
        { new: true }
      );
    })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error adding events" });
    });
});
router.get("/event/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Event.findById(id)
    .populate("Author")
    .populate("join")
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "event not found!!" });
    });
});

router.get("/event", isAuthenticated, (req, res, next) => {
  Event.find()
    .populate("Author")
    .populate("join")
    .then((response) => res.status(200).json(response))
    .catch(() => res.status(400).json({ message: "event don't find" }));
});
router.delete("/event/:eventId", isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;
  Event.findByIdAndRemove(eventId)
    .then((response) => res.json(response))
    .catch((err) =>
      res.status(400).json({ message: "Invalid event supplied" })
    );
});
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
router.put("/event/:eventId/join", isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;
  const { _id } = req.payload;
  Event.findByIdAndUpdate(
    eventId,
    {
      $push: { join: _id },
    },
    { new: true }
  )
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json({ message: "error" }));
});
module.exports = router;
