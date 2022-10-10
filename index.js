//Add packages
//3rd party packages
const inquirer = require('inquirer');
const mysql = require('mysql2'); 
const cTable = require('console.table');
//custom packages
const Roles = require('./lib/roles');
const Employees = require('./lib/employee');

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

//init definition
const firstQuestion = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'],
            name: 'firstAction',
        },
    ])
    .then((ans) => {
        userQuery(ans);
    })
}

//User query
const userQuery = (ans) => {
    switch(ans.firstAction)
    {
        case 'View all departments':
            viewAllDepartments();
        break;
        
        case 'View all roles':
            viewAllRoles();
        break;

        case 'View all employees':
            viewAllEmployees();
        break;

        case 'Add a department':
            addDepartment();
        break;

        case 'Add a role':
            addRole();
        break;

        case 'Add an employee':
            addEmployee();
        break;

        case 'Update an employee role':
            updateEmployee();
        break;

        case 'Quit':
            console.log(`Goodbye.`);
        break;
        
        default:
            break;
    }
}

//View all departments query
const viewAllDepartments = () => {
    db.query('SELECT * FROM departmentTable', function (err, results) {
        console.table(results);
        firstQuestion();
    }
)}

//View all roles query
const viewAllRoles = () => {
    db.query('SELECT * FROM rolesTable', function (err, results) {
        console.table(results);
        firstQuestion();
    }
)}

//View all employees query
const viewAllEmployees = () => {
    db.query(`SELECT employeeTable.id, 
    employeeTable.first_name,
    employeeTable.last_name,
    rolesTable.role_title,
    departmentTable.department_name AS department,
    rolesTable.role_salary,
    employeeTable.manager_id AS manager,
    CONCAT (manager.first_name, ' ', manager.last_name) AS manager
    FROM employeeTable
    LEFT JOIN rolesTable
    ON employeeTable.role_id = rolesTable.id
    LEFT JOIN departmentTable
    ON rolesTable.department_id = departmentTable.id
    LEFT JOIN employeeTable manager ON manager.id = employeeTable.manager_id`, function (err, results) {
        console.table(results);
        firstQuestion();
    }
)}

//add a department
const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please enter the department name:',
            name: 'name',
        },
    ])
    .then((ans) => {
        var name = ans.name;
        db.query('INSERT INTO departmentTable (department_name) VALUE (?)', name, function (err, results)  {
            console.log(`Added ${name} to database`);
            firstQuestion();
        })
    })
}
// add a role
const addRole = () => {
    //query listens for the inquirer promt to be over
    //this is how you can grab all the department names from department table and return it to the user to select from
    db.query('SELECT department_name AS name, id AS value FROM departmentTable', function (err, departmentList) {
        //crashes app
        if(err) throw err;

    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please enter the name of role:',
            name: 'name',
        },
        {
            type: 'input',
            message: 'Please enter the salary of role:',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Which department does the role belong to:',
            choices: departmentList,
            name: 'department',
        },
    ])
    .then((ans) => {
        let {name, salary, department} = ans;
            const newRole = new Roles(name, salary, department);
            //adding firstQuestion function as a parameter waits for query to finish before running quir prompt so that they dont run at the same time causing an error
            newRole.createNewRole(firstQuestion);
        });
    })
}

//add an employee
const addEmployee = () => {
    //both quieries below listen for the inquirer promt to be over
    //for listing roles
    db.query('SELECT role_title AS name, id AS value FROM rolesTable', function (err, roleList) {
        //crashes app
        if(err) throw err;

        // for listing manager
        db.query(`SELECT CONCAT( first_name, ' ', last_name) AS name, id AS value FROM employeeTable`, function (err, managerList) {
            //crashes app
            if(err) throw err;

    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please enter the first name of employee:',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'Please enter the last name of employee:',
            name: 'lastName',
        },
        {
            //How to create an array of rolesTable.role_title from data base?
            type: 'list',
            message: `What is the employee's role:`,
            choices: roleList,
            name: 'role',
        },
        {
            type: 'list',
            message: 'Who is the manager of employee:',
            choices: managerList,
            name: 'manager',
        },
    ])
    .then((ans) => {
        let {firstName, lastName, role, manager} = ans;
        const newEmployee = new Employees(firstName, lastName, role, manager);
        //adding firstQuestion function as a parameter waits for query to finish before running quir prompt so that they dont run at the same time causing an error
        newEmployee.createNewEmployee(firstQuestion);
    })
})
})
}

//update an employee
const updateEmployee = () => {
    //both quieries below listen for the inquirer promt to be over
    //for listing employee names
    db.query(`SELECT CONCAT( first_name, ' ', last_name ) AS name, id AS value FROM employeeTable`, function (err, employeeList) {
        //crashes app
        if(err) throw err;

        // for listing roles
        db.query('SELECT role_title AS name, id AS value FROM rolesTable', function (err, rolesList) {
            //crashes app
            if(err) throw err;

    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Which employee do you want to update:',
            choices: employeeList,
            name: 'employee',
        },
        {
            type: 'list',
            message: 'Which role do you want to assign to this employee?',
            choices: rolesList,
            name: 'role',
        },
    ])
    .then((ans) => {
        let {employee, role} = ans;
        // let name = employee.split(' ');
        // let last_name = name[1];
        // console.log(`${employee}, ${role}`);
        db.query(`UPDATE employeeTable SET role_id = ? WHERE id = ?`, [ role, employee], function (err, result) {
        //     //crashes app
            (err) ? console.log( err) : console.log(result);
            firstQuestion();
        })

    })
})
})
}


//Calling Initial start of application
firstQuestion();
