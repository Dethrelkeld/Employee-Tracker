const connection = require('./connection');
class DB {
    constructor(connection){
        this.connection = connection;
    }
    viewdepartments(){
        return this.connection.query('SELECT * FROM department');
    }
    createDepartment(name) {
        return this.connection.query('insert into department set ?', name)
    }
    deleteDepartment(id) {
        return this.connection.query('delete from department where id= ?', id)
    }
    createRole(roleObj) {
       return this.connection.query('insert into emplrole SET ?', roleObj)
    }
};
module.exports = new DB(connection)

