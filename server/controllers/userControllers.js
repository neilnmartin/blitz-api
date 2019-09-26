module.exports = {
  get: (req, res)  => {
    console.log(req.params)
    // db
    res.send('hello from get')
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