const mysql = require("mysql")
require("dotenv").config()

module.exports = mysql.createConnection({
  /*
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME*/
  host: "localhost",
  user: "root",
  password: "",
  database: "viesbuciu_DB",
  multipleStatements: true
})