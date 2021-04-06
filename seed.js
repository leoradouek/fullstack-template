const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!

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
      {
        name: "Peasant",
        fuelType: "gas",
        fuelLevel: 72.3,
        imageUrl: "https://robohash.org/peasant",
      },
      {
        name: "Rapbot",
        fuelType: "diesel",
        fuelLevel: 10,
        imageUrl: "https://robohash.org/rapbot",
      },
      {
        name: "Sirbot",
        fuelType: "gas",
        fuelLevel: 0.9,
        imageUrl: "https://robohash.org/sirbot",
      },
    ];

    const projects = [
      {
        title: "Customer Service",
        deadline: new Date().toDateString(),
        priority: 5,
        completed: false,
        description:
          "Helps health care providers and patients by greeting them in person and by phone, answering questions and requests, and referring inquiries to the pharmacist.",
      },
      {
        title: "Maintain Records",
        deadline: new Date().toDateString(),
        priority: 6,
        completed: false,
        description:
          "Maintains records by recording and filing physicians’ orders and prescriptions.",
      },
      {
        title: "Maintain Inventory",
        deadline: new Date().toDateString(),
        priority: 8,
        completed: false,
        description:
          "Maintains pharmacy inventory by checking pharmaceutical stock to determine inventory level, anticipating needed medications and supplies, placing and expediting orders, verifying receipt, and removing outdated drugs.",
      },
      {
        title: "Cleaning",
        deadline: new Date().toDateString(),
        priority: 10,
        completed: false,
        description:
          "Maintains a clean working environment, including pharmacy counters, floors and bathrooms",
      },

      {
        title: "Prescription Filling",
        deadline: new Date().toDateString(),
        priority: 8,
        completed: false,
        description:
          "Fills prescription according to label for Pharmacist review",
      },
      {
        title: "Insurance Billing",
        deadline: new Date().toDateString(),
        priority: 8,
        completed: false,
        description:
          "Performs third-party billing, including calls for prior authorization and vacation overrides",
      },
    ];

    const [omni, enigma, matrix, peasant, rapbot, sirbot] = await Promise.all(
      robots.map((robot) => Robot.create(robot))
    );

    const [
      project1,
      project2,
      project3,
      project4,
      project5,
      project6,
    ] = await Promise.all(projects.map((project) => Project.create(project)));

    await omni.setProjects([project1, project2, project3, project4]);
    await enigma.setProjects([project1, project3, project5]);
    await matrix.setProjects([project3, project4, project5, project6]);
    await sirbot.setProjects(project4);
    await peasant.setProjects([project5, project3]);
    await rapbot.setProjects([project1, project2]);
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
