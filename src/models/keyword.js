"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KeyWord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.People, {
        foreignKey: "mainRole",
        targetKey: "key",
        as: "mainrole-keyword",
      });
      this.hasMany(models.People, {
        foreignKey: "subRole",
        targetKey: "key",
        as: "subrole-keyword",
      });
      this.hasMany(models.TimeKeeping, {
        foreignKey: "workType",
        targetKey: "key",
        as: "keyword-worktype",
      });
      this.hasMany(models.TimeKeeping, {
        foreignKey: "dayType",
        targetKey: "key",
        as: "keyword-daytype",
      });
    }
  }
  KeyWord.init(
    {
      type: DataTypes.STRING,
      key: DataTypes.STRING,
      viValue: DataTypes.STRING,
      enValue: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "KeyWord",
    }
  );
  return KeyWord;
};
