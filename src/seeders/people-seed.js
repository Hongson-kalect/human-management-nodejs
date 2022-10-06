"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("People", [
      {
        email: "admin",
        password: "admin",
        firstName: "Diệp",
        lastName: "Hồng Sơn",
        gender: "Male",
        age: 21,
        address: "Vĩnh Phúc",
        phoneNumber: "0123456789",
        workRoom: "IT-01",
        mainRole: "MROLE0",
        subRole: "SROLE0",
        salaryType: "fixed",
        description: "CEO HS Group",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "test@gmail.com",
        password: "123456",
        firstName: "This",
        lastName: "Test",
        gender: "Female",
        age: 20,
        address: "Hà Nội",
        phoneNumber: "012345",
        workRoom: "IT-01",
        mainRole: "MROLE3",
        subRole: "SROLE2",
        salaryType: "fixed",
        description: "Manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("People", null, {});
  },
};
