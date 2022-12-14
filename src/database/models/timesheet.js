import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Timesheet extends Model {
    static associate(models) {
      Timesheet.hasMany(models.UserTimesheet, {
        foreignKey: "timeSheetId",
      });
    }
  }
  Timesheet.init(
    {
      month: {
        type: DataTypes.INTEGER,
      },
      year: {
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
