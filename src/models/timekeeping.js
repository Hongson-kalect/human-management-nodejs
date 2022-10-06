"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeKeeping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      this.belongsTo(models.People, {
        foreignKey: "userId",
        targetKey: "id",
        as: "people-timekeeping",
      });
      this.belongsTo(models.KeyWord, {
        foreignKey: "workType",
        targetKey: "key",
        as: "keyword-worktype",
      });
      this.belongsTo(models.KeyWord, {
        foreignKey: "dayType",
        targetKey: "key",
        as: "keyword-daytype",
      });
    }
  }
  TimeKeeping.init(
    {
      userId: DataTypes.STRING,
      workShift: DataTypes.STRING,
      day: DataTypes.DATE,
      workType: DataTypes.STRING,
      dayType: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TimeKeeping",
    }
  );
  return TimeKeeping;
};
