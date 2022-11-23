const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authConfig = require("../config/auth");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not exists" });
    }
    //Compares the password with your hash
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const { id, user_name } = user;
    return res.json({
      user: {
        id,
        user_name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
