"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MarkDown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.MarkDown, {
        foreignKey: "id",
        targetKey: "userId",
        as: "people-markdown",
      });
    }
  }
  MarkDown.init(
    {
      userId: DataTypes.STRING,
      markDownValue: DataTypes.STRING,
      HTMLValue: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MarkDown",
    }
  );
  return MarkDown;
};
