"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

const roleEnum = {
  ADMIN: "1001",
  USER: "1002",
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = "bookStore@123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassworrd = await bcrypt.hash(password, salt);

    await queryInterface.bulkInsert(
      "users",
      [
        //seeding admin
        {
          name: "Dayesh",
          email: "dayesh1996@gmail.com",
          password: hashedPassworrd,
          role: roleEnum.ADMIN,
        },
        //seeding client
        {
          name: "John Wick",
          email: "john47@gmail.com",
          password: hashedPassworrd,
          role: roleEnum.USER,
        },
      ],
      { returning: ["id"] }
    );
  },
  down: (queryInterface, Sequelize) => {},
};
