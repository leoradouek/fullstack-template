const router = require("express").Router();
const { Robot } = require("../db");

// GET / api/robots
router.get("/", async (req, res, next) => {
  try {
    const robots = await Robot.findAll();
    res.send(robots);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
