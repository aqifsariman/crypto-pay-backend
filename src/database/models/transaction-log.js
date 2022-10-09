import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class TransactionLog extends Model {
    static associate(models) {
      TransactionLog.belongsTo(models.UserTimesheet, {
        foreignKey: "id",
      });
    }
  }
  TransactionLog.init(
    {
      userTimesheet: {
        type: DataTypes.INTEGER,
        references: {
          model: "UserTimesheet",
          key: "id",
        },
      },
      paidDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
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
      modelName: "TransactionLog",
    }
  );
  return TransactionLog;
};
