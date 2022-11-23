const User = require("../models/User");
const Yup = require("yup");
module.exports = {
  async store(req, res) {
    //A tabela de ranking se alimenta dos dados da tabela ˜

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      user_name: Yup.string().required(),
    });
    const { name, email, password, user_name } = req.body;
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failure" });
    }
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res.status(400).json({ error: "This e-mail already exists" });
    }
    const userNameExists = await User.findOne({
      where: { user_name: req.body.user_name },
    });
    if (userNameExists) {
      return res.status(400).json({ error: "This username already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      user_name,
    });

    return res.json(user);
  },
  async update(req, res) {
    const schema = Yup.object().shape({
      gamer_name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failure" });
    }
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: "E-mail  already exists" });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Incorrect Password" });
    }
    const { id, gamer_name } = await user.update(req.body);
    return res.json({ id, gamer_name, email });
  },

  async destroy(req, res) {
    const { id } = req.headers;
    const userLogged = await User.findOne({ where: { id: req.userId } });
    if (userLogged) {
      await (await User.findByPk(req.userId)).destroy();
    }
    return res.json({ message: "Account deleted with successful" });
  },
};
