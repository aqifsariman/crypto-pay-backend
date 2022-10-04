module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Companies", [
      {
        name: "Company A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Companies", null, {});
  },
};
