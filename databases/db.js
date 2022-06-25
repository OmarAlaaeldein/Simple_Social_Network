const mysql = require ('mysql2');

const config = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'network_mayo'
};

const conn = mysql.createConnection(config);

module.exports = conn;