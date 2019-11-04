const bcrypt = require("bcrypt");
const moment = require('moment')
const jwt = require("jwt-simple");
const db = require("../database/");
const { jwtSecret } = require('../config/config').auth
const saltRounds = 10;

const signup = async (req, res) => {
  try {
    console.log("signup req body: ", req.body);
    const { username, password, email, firstName, lastName } = req.body;

    const existingUsername = await db.query(
      `SELECT * FROM users 
      WHERE username='${username}'`
    );
    const existingUserEmail = await db.query(
      `SELECT * FROM users 
      WHERE email='${email}'`
    );
    
    if (existingUsername.length) throw new Error('A user with this username already exists. Please log in or use another username.')
    if (existingUserEmail.length) throw new Error('A user with this email already exists. Please log in or use another email.')
    
    // validation step

    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    await db.query(
      `INSERT INTO users (username, email, password, first_name, last_name)
        VALUES ('${username}', '${email}', '${passwordHash}', '${firstName}', '${lastName}')`
    );

    const user = (await db.query(`
      SELECT id, email, username, first_name, last_name FROM users
      WHERE email='${email}' 
    `))[0]

    const expiration = moment().add(3, 'minutes').toDate();
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
    console.log('JWT payload: ', payload)

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

  } catch (error) {
    console.error("Sign Up Error: ", error);
    res.status(400).send(JSON.stringify(error.message));
  }
};

module.exports = signup;