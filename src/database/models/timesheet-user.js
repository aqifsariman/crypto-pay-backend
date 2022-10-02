'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTimesheet extends Model {
    static associate(models) {
      UserTimesheet.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  UserTimesheet.init(
    {
      timeSheetId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Timesheet',
          key: 'id',
        },
      },
      workingHours: {
        type: DataTypes.INTEGER,
      },
      totalPay: {
        type: DataTypes.INTEGER,
      },
      tokensPaid: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: 'UserTimesheet',
    }
  );
  return UserTimesheet;
};
