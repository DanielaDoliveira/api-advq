const express = require("express");
const authMiddleware = require("./middlewares/auth");

const UserController = require("./controllers/UserController");
const RankingBoardController = require("./controllers/RankingBoardController");
const SessionController = require("./controllers/SessionController");
const PointsController = require("./controllers/PointsController");
const RootController = require("./controllers/RootController");
const routes = express.Router();
routes.get("/", RootController.index);
routes.post("/newuser", UserController.store);
routes.post("/sessions", SessionController.store);
routes.use(authMiddleware);
routes.get("/ranking", RankingBoardController.index);
routes.put("/users", UserController.update);
routes.put("/user/rankup", PointsController.update);
routes.delete("/delete/user", UserController.destroy);

module.exports = routes;
