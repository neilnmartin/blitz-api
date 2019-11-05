const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config/config');

const verifyToken = async (req, res, next) => {
  try {
    console.log('req headers: ', req.headers);

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decodedToken = await jwt.decode(token, config.auth.jwtSecret);
    console.log('decodedToken: ', decodedToken)

    if (moment(decodedToken.expiration).isAfter(moment())) {
      console.log('valid token expiration: ', decodedToken.expiration)
      next()
    } else {
      res.status(401).send({ expiredToken: true })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = verifyToken;