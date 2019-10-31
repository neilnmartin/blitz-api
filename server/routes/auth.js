const bcrypt = require("bcrypt");
const moment = require('moment')
const jwt = require("jwt-simple");
const db = require("../database/");
const { jwtSecret } = require('../config/config').auth
const saltRounds = 10;

const signup = async (req, res) => {
  try {
    console.log("signup req body: ", req.body);
    const { userName, password, email, firstName, lastName } = req.body;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log("passwordHash: ", passwordHash);
    const existingUserName = await db.query(
      `SELECT * FROM users 
      WHERE email='${email}'`
    );
    const existingUserEmail = await db.query(
      `SELECT * FROM users 
      WHERE email='${email}'`
    );
    console.log('existingUserName: ', existingUserName)
    console.log('existingUserEmail: ', existingUserEmail)
    if (existingUserName.length) throw new Error('A user with this username already exists. Please log in or use another username.')
    if (existingUserEmail.length) throw new Error('A user with this email already exists. Please log in or use another email.')
    const user = await db.query(
      `INSERT INTO users (user_name, email, password, first_name, last_name)
        VALUES ('${userName}', '${email}', '${passwordHash}', '${firstName}', '${lastName}')`
    );
    console.log('inserted user: ', user)
    const expiration = moment().add(3, 'minutes').toDate();
    console.log('expiration: ', expiration)
    const payload = {
      user,
      expiration
    }
    console.log('token payload: ', payload)
    var token = jwt.encode(payload, jwtSecret);
    console.log('JWT: ', token)
    const updatedUser = await db.query(
      `UPDATE users
      SET token='${token}'`
    );
    console.log(updatedUser)
    res.status(200).send({ success: true, token });
  } catch (error) {
    console.error("Sign Up Error: ", error);
    res.status(400).send(JSON.stringify(error.message));
  }
};

const login = async (req, res) => {
  try {
    console.log("login req body: ", req.body);
    const { userName, password, email } = req.body;
    const users = (await db.query(`
        SELECT email, password FROM users
        WHERE user_name='${userName}'`));
    console.log("db users: ", users);
    if(!users || users.length) { throw new Error("User does not exist. Please Sign Up.") }
    const user = users[0]

    const pwMatch = await bcrypt.compare(password, user.password);

    if (pwMatch) {
      console.log("password matches database val: ", pwMatch);
      console.log('expiration: ', expiration)
      const payload = {
        user,
        expiration
      }
      console.log('token payload: ', payload)
      var token = jwt.encode(payload, jwtSecret);
      console.log('JWT: ', token)
      res.status(200).send({ success: true, token });
    } else {
      throw new Error("Incorrect password")
    }
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).send(error.message);
  }
};

module.exports = { login, signup };
