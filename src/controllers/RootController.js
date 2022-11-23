const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ["user_name", "points"],

      order: [["points", "DESC"]],
    });
    return res.json(users);
  },
};
