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

const date = new Date();
const projects = [
  {
    title: "Customer Service",
    deadline: date,
    priority: 5,
    completed: false,
    description:
      "helps health care providers and patients by greeting them in person and by phone, answering questions and requests, and referring inquiries to the pharmacist.",
  },
  {
    title: "Maintain Records",
    deadline: date,
    priority: 6,
    completed: false,
    description:
      "maintains records by recording and filing physicians’ orders and prescriptions.",
  },
  {
    title: "Maintain Inventory",
    deadline: date,
    priority: 8,
    completed: false,
    description:
      "maintains pharmacy inventory by checking pharmaceutical stock to determine inventory level, anticipating needed medications and supplies, placing and expediting orders, verifying receipt, and removing outdated drugs.",
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
