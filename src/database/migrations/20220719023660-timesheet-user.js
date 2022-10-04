export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserTimesheets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      timeSheetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Timesheets",
          key: "id",
        },
      },
      workingHours: {
        type: Sequelize.INTEGER,
      },
      totalPay: {
        type: Sequelize.INTEGER,
      },
      tokensPaid: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("UserTimesheets");
  },
};
