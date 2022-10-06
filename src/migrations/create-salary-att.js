"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SalaryAtts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      basicSalary: {
        type: Sequelize.DOUBLE,
      },
      positionSalary: {
        type: Sequelize.DOUBLE,
      },
      laboriousBonus: {
        type: Sequelize.DOUBLE,
      },
      languageBonus: {
        type: Sequelize.DOUBLE,
      },
      vehicleBonus: {
        type: Sequelize.DOUBLE,
      },
      innBonus: {
        type: Sequelize.DOUBLE,
      },
      insurance: {
        type: Sequelize.DOUBLE,
      },
      other: {
        type: Sequelize.DOUBLE,
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SalaryAtts");
  },
};
