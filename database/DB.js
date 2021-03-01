const connection = require('./connection');
// constructor to build mysql queries
class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // department set
    viewdepartments() {
        return this.connection.query('SELECT * FROM department');
    }
    createDepartment(name) {
        return this.connection.query('insert into department set ?', name)
    }
    deleteDepartment(id) {
        return this.connection.query('delete from department where id= ?', id)
    }
    // role set
    createRole(roleObj) {
        return this.connection.query('insert into emplrole SET ?', roleObj)
    }

    // employee set
    createEmp(emp) {
        return this.connection.query('insert into employee set ?', emp)
    }
    // manager set
    createMan(man) {
        return this.connection.query('insert into ')
    }
    viewRoles() {
        return this.connection.query('SELECT * FROM emplrole')
    }
    viewEmployees() {
        return this.connection.query('SELECT * FROM employee')
    }
    // update set
};

module.exports = new DB(connection)

