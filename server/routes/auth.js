const authRouter = require("express").Router();

const login = require("../controllers/login");
const signup = require("../controllers/signup");

authRouter
  .post("/login", login)
  .post("/signup", signup);

module.exports = authRouter;
