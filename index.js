// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
// name connection specifics
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'ziggy',
  database: 'employ_db',
});
// call connection to start prompt program
connection.connect((err) => {
  if (err) throw err;
  runManager();
});

const runManager = () => {
    inquirer.prompt({
        name:
    })
}