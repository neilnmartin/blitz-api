const authRouter = require("express").Router();

const login = require("./login");
const signup = require("./signup");

authRouter
  .post("/login", login)
  .post("/signup", signup);

module.exports = authRouter;
