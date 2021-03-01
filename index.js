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
    type: "list",
    name: "selectoptions",
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
      'View Roles',
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
        createRole();
        break;
      case 'Delete Role':
        deleteRole();
        break;
      case 'View Roles':
        viewRoles();
        break;

    };
  });
};
// department set of functions
function viewdepartments() {
  DB.viewdepartments().then(function (res) {
    printTable(res);
    runManager();
  })
};

function viewRoles() {
  DB.viewRoles().then(function (res) {
    printTable(res);
    runManager();
  })
};

function createDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the name of the new department?"
    }
  ]).then(res => {
    const dept = {
      dept_name: res.department_name
    }
    DB.createDepartment(dept).then(function (res) {
      console.log(`created department ${res.department_name}`);
      viewdepartments();
      

    });
  })
};

async function deleteDepartment() {
  const departments = await DB.viewdepartments();
  const departmentArray = departments.map(({ id, dept_name }) => ({
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
  ]).then(function (res) {
    DB.deleteDepartment(res.department_id).then(function (res) {
      viewdepartments();
      console.log(res);
    });
    
  });
};

// employee set of functions
async function createEmp() {
  const roles = await DB.viewRoles();
  const rolesArray = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const manager = await DB.viewEmployees();
  const managerArray = manager.map(({ id, emp_name }) => ({
    name: emp_name,
    value: id,
  }));
  inquirer.prompt([
    {
      type: "input",
      name: "employee_name",
      message: "What is the name of the new employee?"
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the role of the new employee?",
      choices: rolesArray
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the manager of the new employee?",
      choices: managerArray
    },

  ]).then(answer => {
    const emp = {
      emp_name: answer.employee_name,
      role_id: answer.role_id,
      manager_id: answer.manager_id
    }
    DB.createEmp(emp).then(function (res) {
      console.log(`created employee ${res}`);
    DB.viewEmployees()

    });
  })
};

// update set of functions

// manager set of functions
function createMan() {
  inquirer.prompt([
    {
      type: "input",
      name: "manager_name",
      message: "What is the name of the new manager?"
    }
  ]).then(answer => {
    const man = {
      man_name: answer.manager_name
    }
    DB.createMan(man).then(function (res) {
      console.log(`created manager ${answer.man_name}`);
      viewdepartments();
      

    });
  })
};

// role set of functions
async function createRole() {
  const departments = await DB.viewdepartments();
  const departmentArray = departments.map(({ id, dept_name }) => ({
    name: dept_name,
    value: id,
  })); console.log(departmentArray);
  inquirer.prompt([
    {
      type: "input",
      name: "role_name",
      message: "What is the new role?"
    },
    {
      type: "input",
      name: "role_salary",
      message: "What is the salary for the new role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "What is the department for this?",
      choices: departmentArray
    },

  ]).then(answer => {
    const roleObj = {
      title: answer.role_name,
      salary: answer.role_salary,
      department_id: answer.department_id
    }
    DB.createRole(roleObj).then(function (res) {
      console.log(`created role ${answer.role_name}`);
      viewRoles();
      

    });
  })
};

// callback for running inquirer
runManager();