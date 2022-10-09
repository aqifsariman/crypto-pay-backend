export default {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Users", // table name
        "avatar", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },

  down: async (queryInterface) => {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn("Users", "avatar")]);
  },
};
