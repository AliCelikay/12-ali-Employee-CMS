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

class Employee {
    constructor(firstName, lastName, role, manager)
    {
        this.firstName = firstName,
        this.lastName = lastName,
        this.role = role,
        this.manager = manager
    }

    rolesDepartmentId() {
        db.query('SELECT * FROM departmentTable WHERE department_name = ?', this.role_department, function (err, results) {
            if (err) console.log(err);            
            const departmentId = results[0].id;
            console.log(departmentId);
        });
    }

    createNewRole() {
        const departmentId = this.rolesDepartmentId();
        db.query('INSERT INTO rolesTable (role_title, role_salary, department_id) VALUES (?, ?, ?)', [this.title, this.salary, departmentId], function (err, results) {
            if (err) console.log(err);
            console.log(results);
            console.log(`Added ${this.title} to database`);
        
        });
    }
}

module.exports = Employee;
