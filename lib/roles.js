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
    // Works Kind OF
    rolesDepartmentId() {
        db.query('SELECT * FROM departmentTable WHERE department_name = ?', this.roleDepartment, function (err, results) {
            if (err) console.log(err);            
            const departmentId = results[0].id;
            return departmentId;
        });
    }

    createNewRole() {
        const departmentId = this.rolesDepartmentId();
        db.query('INSERT INTO rolesTable (role_title, role_salary, department_id) VALUES (?, ?, ?)', [this.roleTitle, this.roleSalary, departmentId], function (err, results) {
            if (err) console.log(err);
            console.log(results);
            console.log(`Added ${this.roleTitle} to database`);
        });
    }
}

module.exports = Roles;
