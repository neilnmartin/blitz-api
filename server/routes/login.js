const bcrypt = require("bcrypt");
const moment = require('moment');
const jwt = require("jwt-simple");
const db = require("../database/");
const { jwtSecret } = require('../config/config').auth

const login = async (req, res) => {
  try {
    console.log("login req body: ", req.body);
    const { username, password, email } = req.body;

    const users = await db.query(`
        SELECT id, email, username, password, first_name, last_name FROM users
        WHERE email='${email}'`);
    console.log("db users: ", users);

    if (!users || !users.length) { throw new Error("User does not exist. Please Sign Up.") }

    const user = users[0]

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const expiration = moment().add(3, 'minutes').toDate();
      console.log('expiration: ', expiration)

      const payload = {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        expiration
      }
      console.log('token payload: ', payload);

      var token = jwt.encode(payload, jwtSecret);
      console.log('JWT: ', token);

      await db.query(`
        UPDATE users
        SET token='${token}'
      `);

      res.status(200).send({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        token
      });
    } else {
      throw new Error("Incorrect password")
    }
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).send(error.message);
  }
};

module.exports = login;
