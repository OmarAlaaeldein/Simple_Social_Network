const mysql = require ('mysql2');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'network'
};

const conn = mysql.createConnection(config);

module.exports = conn;