//mysql package
const mysql = require('mysql2'); 

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      //MySQL Password
      password: 'rootroot',
      //MySQL database
      database: 'employeeCMS_db'
    },
    console.log(`Connected to the employeeCMS_db database.`)
);

class Roles {
    constructor(roleTitle, roleSalary, roleDepartment)
    {
        this.roleTitle = roleTitle,
        this.roleSalary = roleSalary,
        this.roleDepartment = roleDepartment
    }
    
    createNewRole(firstQuestion) {
        db.query('INSERT INTO rolesTable (role_title, role_salary, department_id) VALUES(?, ?, ?)', [this.roleTitle, this.roleSalary, this.roleDepartment], function (err, results) {
            if (err) throw err;
            console.log(results);
            //Waits for query to finish before running quir prompt so that they dont run at the same time causing an error
            firstQuestion();
        });
    }
}

module.exports = Roles;
