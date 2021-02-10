const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');

// name connection specifics
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'employ_db',
});
// call connection to start prompt program
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as:" + connection.threadId)
});

connection.query = util.promisify(connection.query);

module.exports = connection;