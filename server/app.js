const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");

const verifyToken = require('./utils/verifyTokenMiddleware')

const authRouter = require("./routes/auth");
const router = require("./routes/");

const app = express();

app.use("/", morgan("dev"));
app.use("/", bodyParser.json());
app.use("/auth", authRouter);
app.use("/api", verifyToken, router);

module.exports = app;