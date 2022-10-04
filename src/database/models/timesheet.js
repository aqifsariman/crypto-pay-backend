import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Timesheet extends Model {
    static associate(models) {
      Timesheet.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Timesheet.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      monthYear: {
        type: DataTypes.INTEGER,
      },
      isClosed: {
        type: DataTypes.BOOLEAN,
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
      modelName: "Timesheet",
    }
  );
  return Timesheet;
};
