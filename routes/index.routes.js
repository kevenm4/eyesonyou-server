const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const commentRoutes = require("./comment.routes");
/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/", authRoutes);
router.use("/", userRoutes);
router.use("/", commentRoutes);

module.exports = router;
