module.exports = {
  database: {  
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET
  }
}