export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactionLog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userTimesheet: {
        type: Sequelize.INTEGER,
        references: {
          model: 'userTimesheet',
          key: 'id',
        },
      },
      paidDate: {
        type: Sequelize.INTEGER,
      },
      totalPayment: {
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
    await queryInterface.dropTable('transactionLog');
  },
};
