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
);

class Employee {
    constructor(firstName, lastName, role, manager)
    {
        this.firstName = firstName,
        this.lastName = lastName,
        this.role = role,
        this.manager = manager
    }

    createNewEmployee(firstQuestion) {
        db.query('INSERT INTO employeeTable (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [this.firstName, this.lastName, this.role, this.manager], function (err, results) {
            if (err) throw err;
            firstQuestion();
        });
    }
}

module.exports = Employee;
