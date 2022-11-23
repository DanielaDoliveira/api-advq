const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        user_name: DataTypes.STRING,
        points: DataTypes.INTEGER,
      },
      { sequelize }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.hasOne(models.Ranking, { foreignKey: "fk_user_id", as: "rankings" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
