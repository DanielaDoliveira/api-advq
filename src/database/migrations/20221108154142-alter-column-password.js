"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn("users", "password", "password_hash");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn("users", "password_hash", "password");
  },
};
