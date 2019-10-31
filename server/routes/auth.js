const bcrypt = require("bcrypt");
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
    const user = await db.query(
      `INSERT INTO users (user_name, email, password, first_name, last_name)
        VALUES ('${userName}', '${email}', '${passwordHash}', '${firstName}', '${lastName}')`
    );
    console.log('inserted user: ', user)
    const payload = {
      user,
      expiration
    }
    var token = jwt.encode(payload, secret);
    res.status(200).send({ success: true, token });
  } catch (error) {
    console.error("Sign Up Error: ", error);
    res.status(400).send(JSON.stringify(error));
  }
};

const login = async (req, res) => {
  try {
    console.log("login req body: ", req.body);
    const { userName, password, email } = req.body;
    const user = (await db.query(`
        SELECT email, password FROM users
        WHERE user_name='${userName}'`))[0];
    console.log("db user: ", user);
    if (!user) throw new Error("User does not exist. Please Sign Up.");
    const pwMatch = await bcrypt.compare(password, user.password);
    if (pwMatch) {
      console.log("password matches database val: ", pwMatch);
      //login jwt token generate
    }
    res.status(200).send("login yo");
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).send(error);
  }
};

module.exports = { login, signup };
