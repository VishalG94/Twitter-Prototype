var mysql = require('mysql');

var con = mysql.createConnection({
  host: "twitter.c64ohfdyhtuh.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "cmpe273twitter",
  database: "innodb"
});


module.exports = con ;