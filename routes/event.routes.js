const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/event-create", isAuthenticated, (req, res, next) => {
  const { title, description } = req.body;
  const { _id } = req.payload;

  Event.create({ title, description, Author: _id, join: [] })
    .then((createdevent) => {
      res.status(200).json(createdevent);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error adding events" });
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
    .catch((err = res.status(400).json({ message: "Invalid event supplied" })));
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
