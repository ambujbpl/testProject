var mysql = require('mysql');
var config = require('./config.js');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: config.mysqldb.host,
  user: config.mysqldb.user,
  password: config.mysqldb.password,
  database: config.mysqldb.database,
  multipleStatements: config.mysqldb.multipleStatements
});
// Attempt to catch disconnects
pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.log(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.log(new Date(), 'MySQL close', err);
  });
});

module.exports = pool;