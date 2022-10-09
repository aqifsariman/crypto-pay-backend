import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class UserTimesheet extends Model {
    static associate(models) {
      UserTimesheet.belongsTo(models.User, {
        foreignKey: "userId",
      });
      UserTimesheet.belongsTo(models.Timesheet, {
        foreignKey: "timeSheetId",
      });
      UserTimesheet.hasMany(models.TransactionLog, {
        foreignKey: "userTimesheet",
      });
    }
  }
  UserTimesheet.init(
    {
      timeSheetId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Timesheets",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
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
      modelName: "UserTimesheet",
    }
  );
  return UserTimesheet;
};
