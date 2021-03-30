const router = require("express").Router();
const { Robot, Project } = require("../db");

// GET / api/robots
router.get("/", async (req, res, next) => {
  try {
    const robots = await Robot.findAll();
    res.send(robots);
  } catch (err) {
    next(err);
  }
});

// GET /api/robots/:id
router.get("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id, {
      include: [
        {
          model: Project,
          through: {
            where: {
              robotId: req.params.id,
            },
          },
        },
      ],
    });
    res.send(robot);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
