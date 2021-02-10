// dependencies
const inquirer = require('inquirer');
const DB = require('./database/DB');
const { printTable } = require('console-table-printer');
// name connection specifics

// function to prompt questions
const runManager = () => {
  console.log('Business Option Choosing Time!');
  
  // initial prompt
  inquirer.prompt([{
    name: "selectoptions",
    type: "list",
    message: "What action would you like to take?",
    choices: [
      'View Departments',
      'Add Department',
      'Delete Department',
      'Add Employee',
      'Remove Employee',
      'Update Employee Role',
      'Update Employee Manager',
      'Update Employee Department',
      'Add Manager',
      'Delete Manager',
      'Add Role',
      'Delete Role',
    ]
    // switch for processing user inputs
  }]).then(options => {
    switch (options.selectoptions) {
      case 'View Departments':
        viewdepartments();
        break;
        case 'Add Department':
          createDepartment();
        break;
        case 'Delete Department':
          deleteDepartment();
        break;
        case 'Add Employee':
          createEmp();
        break;
        case 'Remove Employee':
          removeEmp();
        break;
        case 'Update Employee Role':
          updateEmp();
        break;
        case 'Update Employee Manager':
          updateEmpMan();
        break;
        case 'Update Employee Department':
          updateEmpDept();
        break;
        case 'Add Manager':
          addMan();
        break;
        case 'Delete Manager':
          deleteMan();
        break;
        case 'Add Role':
          addRole();
        break;
        case 'Delete Role':
          deleteRole();
        break;
        
      };
    });
};
// department set of functions
function viewdepartments() {
DB.viewdepartments().then(function(res){
  printTable(res);
})
};
function createDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the name of the new department?"
    }
  ]).then(answer => {
    const dept = {
      dept_name: res.department_name
    }
    DB.createDepartment(dept).then(function(res){
      console.log(`created department ${answer.department_name}`);
      viewdepartments();

    });
  })
};

async function deleteDepartment() {
  const departments = await DB.viewdepartments();
 const departmentArray = departments.map(({id,dept_name}) => ({
   name: dept_name,
   value: id,
 }));
 inquirer.prompt([
   {
     type: "list",
     name: "department_id",
    message: "Which department would you like to delete?",
    choices: departmentArray
   }
 ]).then(function(res) {
  DB.deleteDepartment(res.department_id)
 });
};
 
// employee set of functions
function createEmp() {
  inquirer.prompt([
    {
      type: "input",
      name: "employee_name",
      message: "What is the name of the new employee?"
    }
  ]).then(answer => {
    const dept = {
      dept_name: res.employee_name
    }
    DB.createDepartment(dept).then(function(res){
      console.log(`created department ${answer.department_name}`);
      viewdepartments();

    });
  })
};

// update set of functions

// manager set of functions

// role set of functions


// callback for running inquirer
runManager();