const User = require("../models/User");
module.exports = {
  async index(req, res) {
    const { data } = req.query;
    //lista todos os usuários e suas pontuações
    //somente usuários logados
    const { id } = req.headers;
    const userLogged = await User.findOne({ where: { id: req.userId } });
    if (userLogged) {
      const users = await User.findAll({
        attributes: ["user_name", "points"],
        limit: data,
        order: [["points", "DESC"]],
      });
      return res.json(users);
    }
  },
};
