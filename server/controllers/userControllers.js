const db = require("../database");

module.exports = {
  get: async (req, res) => {
    try {
      console.log(req.params)
      // db
      const users = await db.query(`
        SELECT id, email, username, password, first_name, last_name FROM users
        WHERE email='${email}'`);
      console.log("db users: ", users);
      res.status(200).send(users)
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  },
  post: (req, res) => {
    res.status(200).send('Please sign up')
  },
  put: (req, res) => {
    console.log(req.body)
    // db
    res.send('hello from put')
  },
  delete: (req, res) => {
    console.log(req.params)
    // db
    res.send('Please deactivate account')
  }
}