const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        admin_name: DataTypes.STRING,
        points: DataTypes.INTEGER,
      },
      { sequelize }
    );
    this.addHook("beforeSave", async (admin) => {
      if (admin.password) {
        admin.password_hash = await bcrypt.hash(admin.password, 8);
      }
    });
    return this;
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = Admin;
