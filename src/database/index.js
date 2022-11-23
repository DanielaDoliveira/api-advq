const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const User = require("../models/User");
const Admin = require("../models/Admin");
const connection = new Sequelize(dbConfig);

User.init(connection);
Admin.init(connection);
module.exports = connection;
