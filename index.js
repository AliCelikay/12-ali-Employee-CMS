//Add packages
//3rd party packages
const inquirer = require('inquirer');
const mysql = require('mysql2'); 
const cTable = require('console.table');
const Roles = require('./lib/roles');

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
        // console.table(ans);
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
            // viewAllDepartments();
        break;

        case 'Quit':
            console.log("Thank you!\bGoodbye.");
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

const addRole = () => {
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
            type: 'input',
            message: 'Which department does the role belong to:',
            name: 'department',
        },
    ])
    .then((ans) => {
        // const getDepartmentId = () => {
        //     db.query('SELECT * FROM departmentTable WHERE department_name = ?', ans.department , function (err, results) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             const departmentId = results[0].id
        //             console.log( departmentId);
                    
        //         }
        //     });
        
        // }
        let {name, salary, department} = ans;
        const newRole = new Roles(name, salary, department);
        newRole.createNewRole();        
        firstQuestion();
    })
}

const addEmployee = () => {
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
            type: 'input',
            message: 'Please enter the role of employee:',
            name: 'role',
        },
        {
            type: 'input',
            message: 'Who is the manager of employee:',
            name: 'manager',
        },
    ])
    .then((ans) => {
        
        
        
        

        firstQuestion();
    })
}


//Calling Initial start of application
firstQuestion();
