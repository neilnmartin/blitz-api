const db = require("../database");

module.exports = {
  get: async (req, res)  => {
    try {
      console.log(req.params)
      const { title, id } = req.params 
      
      const art = await db.query(`
          SELECT id, title FROM art
          WHERE id='${id}'`);
      console.log("db art: ", art);
      
      res.status(200).send(art)
    } catch (e) {
      console.error(e)
      res.status(500)
    }
  },
  post: (req, res)  => {
    console.log(req.params)
    // db
    res.send('hello from post')
  },
  put: (req, res)  => {
    console.log(req.params)
    // db
    res.send('hello from put')
  },
  delete: (req, res)  => {
    console.log(req.params)
    // db
    res.send('hello from delete')
  }
}