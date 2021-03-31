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

//POST /api/robots/
router.post("/", async (req, res, next) => {
  try {
    console.log("what is req.body", req.body);
    const robot = {
      name: req.body.robotName,
    };

    const newRobot = await Robot.create(robot);
    res.status(201).json(newRobot);
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const doesRobotExist = await Robot.findOne({
//       where: {
//         name: req.body.name,
//       },
//     });
//     if (!doesRobotExist) {
//       const newRobot = await Robot.create(req.body);
//       res.status(201).json(newRobot);
//       return;
//     }
//     res.sendStatus(409);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
