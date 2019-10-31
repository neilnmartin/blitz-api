const express = require("express");
const bodyParser = require('body-parser')
const morgan = require("morgan");
const config = require('./config/config')
const { login, signup } = require("./routes/auth");
const router = require("./routes/");
const db = require('./database/');

const app = express();

app.use("/", morgan("dev"));
app.use("/", bodyParser.json());

app.use("/login", login);
app.use("/signup", signup);
// verify token

app.use("/api", async (req, res) => {
  try {
    var decoded = jwt.decode(req.header.token, config.auth.jwtSecret);
    if (decoded.expiration < Date.now()) {
      next()
    } else {
      res.status(401).send({ expiredToken: true })
    }
  } catch (e) {
    console.error(e)
  }
}, router);


module.exports = app;
