const router = require("express").Router();

// Your routes go here!
router.use("/robots", require("./robots"));
router.use("/projects", require("./projects"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
