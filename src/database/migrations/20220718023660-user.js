export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      designation: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.INTEGER,
      },
      walletAddress: {
        type: Sequelize.STRING,
      },
      isHR: {
        type: Sequelize.BOOLEAN,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Users");
  },
};
