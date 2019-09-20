let router = require('express').Router()

router.get('/api', (req, res) => { console.log(req); res.send('hello') })

module.exports = router