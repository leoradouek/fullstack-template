// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");
const Project = require("./project");
const Robot = require("./robot");

Project.belongsToMany(Robot, { through: "assigned" });
Robot.belongsToMany(Project, { through: "assigned" });

module.exports = {
  db,
  Project,
  Robot,
};
