const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

const robots = [
  {
    name: "Omni",
    fuelType: "electric",
    fuelLevel: 92,
    imageUrl: "https://robohash.org/omni",
  },
  {
    name: "Enigma",
    fuelType: "electric",
    fuelLevel: 100,
    imageUrl: "https://robohash.org/enigma",
  },
  {
    name: "Matrix",
    fuelType: "diesel",
    fuelLevel: 64.88,
    imageUrl: "https://robohash.org/matrix",
  },
];

const projects = [
  {
    title: "marketing campaign",
    deadline: "06/22/2021",
    priority: 5,
    completed: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    title: "customer feedback",
    deadline: "04/01/2021",
    priority: 6,
    completed: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    title: "inventory",
    deadline: "05/15/2021",
    priority: 8,
    completed: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];
const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Promise.all(
      robots.map((robot) => {
        return Robot.create(robot);
      })
    );

    await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
