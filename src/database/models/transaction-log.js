'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionLog extends Model {
    static associate(models) {
      TransactionLog.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  TransactionLog.init(
    {
      userTimesheet: {
        type: DataTypes.INTEGER,
        references: {
          model: 'UserTimesheet',
          key: 'id',
        },
      },
      paidDate: {
        type: DataTypes.INTEGER,
      },
      totalPayment: {
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
      modelName: 'TransactionLog',
    }
  );
  return TransactionLog;
};
