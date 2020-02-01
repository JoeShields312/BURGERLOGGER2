const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "2354",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) throw err;
    console.log('Connected to database as ' + connection.threadId);
});

module.exports = connection;