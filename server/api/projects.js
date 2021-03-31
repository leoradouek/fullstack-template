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

//POST /api/projects/
router.post("/", async (req, res, next) => {
  try {
    const project = {
      title: req.body.title,
    };

    const newProject = await Project.create(project);
    res.status(201).json(newProject);
    return;
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await project.destroy();
    res.send(project);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
