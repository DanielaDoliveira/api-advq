//Atualiza a pontuação do usuário quando esta mudar

const User = require("../models/User");

module.exports = {
  async update(req, res) {
    const { points } = req.body;
    const user = await User.findByPk(req.userId);
    user.points = points;
    user.save();
    return res.status(200).json({ message: "Rank up!" });
  },
};
