const router = require("express").Router();
const { Project, Robot } = require("../db");

// GET / api/projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.send(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Robot,
          through: {
            where: {
              projectId: req.params.id,
            },
          },
        },
      ],
    });
    res.send(project);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
