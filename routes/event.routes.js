const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post(
  "/user/:id/event",
  fileUploader.single("eventImage"),
  isAuthenticated,
  (req, res, next) => {
    const { title, description, author, imageUrl, join } = req.body;
    const { _id } = req.payload;

    Post.create({ title, description, author, imageUrl, join }).then(
      (createdevent) => {
        return User.findByIdAndUpdate(_id, {
          $push: { Events: createdevent._id },
        })

          .then((createdevent) => {
            res.status(200).json(createdevent);
          })
          .catch(() =>
            res.status(400).json({ message: "Error adding events" })
          );
      }
    );
  }
);
router.get("/event", (req, res, next) => {
  Event.find()
    .populate("join")
    .populate("author")
    .then((response) => res.status(200).json(response))
    .catch(() => res.status(400).json({ message: "event don't find" }));
});
router.delete("/event/:eventId", isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;
  Event.findByIdAndRemove(eventId)
    .then((response) => res.json(response))
    .catch((err = res.status(400).json({ message: "Invalid event supplied" })));
});
router.put("/event/:eventId/join", (req, res, next) => {
  const { eventId } = req.params;
  const { _id } = req.payload;
  Event.findByIdAndUpdate(eventId, {
    $push: { join: _id },
  })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json({ message: "error" }));
});
module.exports = router;
