"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalaryAtt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.People, {
        foreignKey: "id",
        targetKey: "userId",
        as: "people-salaryatt",
      });
    }
  }
  SalaryAtt.init(
    {
      userId: DataTypes.STRING,
      basicSalary: DataTypes.DOUBLE,
      positionSalary: DataTypes.DOUBLE,
      laboriousBonus: DataTypes.DOUBLE,
      languageBonus: DataTypes.DOUBLE,
      vehicleBonus: DataTypes.DOUBLE,
      innBonus: DataTypes.DOUBLE,
      insurance: DataTypes.DOUBLE,
      other: DataTypes.DOUBLE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SalaryAtt",
    }
  );
  return SalaryAtt;
};
