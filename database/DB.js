const connection = require('./connection');
// constructor to build mysql queries
class DB {
    constructor(connection){
        this.connection = connection;
    }
    // department set
    viewdepartments(){
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

    // manager set

    // update set
};

module.exports = new DB(connection)

