const router = require("express").Router();
const { Project, Robot } = require("../db");

// *** GET ***

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.send(projects);
  } catch (err) {
    next(err);
  }
});

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

// *** POST ***

router.post("/", async (req, res, next) => {
  try {
    const project = {
      title: req.body.title,
      description: req.body.description,
      prioty: req.body.priority,
    };

    const newProject = await Project.create(project);
    res.status(201).json(newProject);
    return;
  } catch (err) {
    next(err);
  }
});

// *** DELETE ***

router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await project.destroy();
    res.send(project);
  } catch (error) {
    next(error);
  }
});

// *** PUT ***

router.put("/update/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    res.send(await project.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
