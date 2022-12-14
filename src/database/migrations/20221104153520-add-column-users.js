"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "points", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "users",
      "points",
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      { transaction }
    );
  },
};
