const db = require("../database");

module.exports = {
  get: async (req, res)  => {
    try {
      console.log(req.params)
      const { title, id } = req.params
      console.log(title, id)
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
  post: async (req, res)  => {
    try {
      console.log(req.body)
      const { title, id, artistId } = req.body
      console.log(title, id)
      const art = await db.query(`
          INSER INTO art (title, artistId)
          VALUES ('${title}', '${artistId}')`);
      console.log("db art: ", art);
      
      res.status(200).send(art)
    } catch (e) {
      console.error(e)
      res.status(500)
    }
  },
  put: (req, res)  => {
    console.log(req.params)
    // db
    res.send('hello from put')
  },
  delete: async (req, res)  => {
    try {
      console.log(req.params)
      const { title, id } = req.params
      console.log(title, id)
      const art = await db.query(`
          DELETE FROM art
          WHERE id='${id}'`);
      console.log("db art: ", art);
      res.status(200).send({ 
        success: true,
        message: `Successfully deleted ${title}`
      })
    } catch (e) {
      console.error(e)
      res.status(500)
    }
}