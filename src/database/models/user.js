'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserTimesheet, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter email address.',
        },
        unique: {
          args: false,
          msg: 'Email address already exist.',
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Please enter valid email address.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isHR: {
        type: DataTypes.BOOLEAN,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'company',
          key: 'id',
        },
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
      modelName: 'User',
    }
  );
  return User;
};