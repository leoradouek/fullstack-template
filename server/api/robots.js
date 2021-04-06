const router = require("express").Router();
const { Robot, Project } = require("../db");

// *** GET ***

router.get("/", async (req, res, next) => {
  try {
    const robots = await Robot.findAll();
    res.send(robots);
  } catch (err) {
    next(err);
  }
});

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

// *** POST ***

router.post("/", async (req, res, next) => {
  try {
    const robot = {
      name: req.body.name,
      fuelType: req.body.fuelType,
      fuelLevel: req.body.fuelLevel,
    };

    const newRobot = await Robot.create(robot);
    res.status(201).json(newRobot);
  } catch (error) {
    next(error);
  }
});

// *** DELETE ***

router.delete("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    await robot.destroy();
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/:projectId", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    const project = await Project.findByPk(req.params.projectId);
    await robot.removeProject(project);
    res.send(project);
  } catch (error) {
    next(error);
  }
});

// *** PUT ***

router.put("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    res.send(await robot.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
