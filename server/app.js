const express = require("express");
const bodyParser = require('body-parser')
const morgan = require("morgan");
const router = require("./routes/");
const { login, signup } = require("./routes/auth");
const db = require('./database/');

const app = express();

app.use("/", morgan("dev"));
app.use("/", bodyParser.json());
app.use("/api", router);

app.use("/login", login);
app.use("/signup", signup);

module.exports = app;
