"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TimeKeeping, {
        foreignKey: "userId",
        targetKey: "id",
        as: "people-timekeeping",
      });
      this.belongsTo(models.SalaryAtt, {
        foreignKey: "id",
        targetKey: "userId",
        as: "people-salaryatt",
      });
      this.belongsTo(models.MarkDown, {
        foreignKey: "id",
        targetKey: "userId",
        as: "people-markdown",
      });
      this.belongsTo(models.KeyWord, {
        foreignKey: "mainRole",
        targetKey: "key",
        as: "mainrole-keyword",
      });
      this.belongsTo(models.KeyWord, {
        foreignKey: "subRole",
        targetKey: "key",
        as: "subrole-keyword",
      });
    }
  }
  People.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      workRoom: DataTypes.STRING,
      mainRole: DataTypes.STRING,
      subRole: DataTypes.STRING,
      salaryType: DataTypes.STRING,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
      deleted: DataTypes.STRING,
      //deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "People",
    }
  );
  return People;
};
