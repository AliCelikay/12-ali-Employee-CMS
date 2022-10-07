//Add packages
//3rd party packages
const inquirer = require('inquirer');
const mysql = require('mysql2'); 
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
      password: 'rootroot',
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
            // viewAllDepartments();
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
    db.query(`SELECT employeeTable.id AS id, 
    employeeTable.first_name AS first_name,
    employeeTable.last_name AS last_name,
    rolesTable.role_title AS title,
    departmentTable.department_name AS department
    FROM employeeTable
    LEFT JOIN rolesTable
    ON employeeTable.role_id = rolesTable.id
    LEFT JOIN departmentTable
    ON rolesTable.department_id = departmentTable.id`, function (err, results) {
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
    const departmentChoices = () => {
        var deptNames;
        db.query(`SELECT * FROM departmentTable`, function (err, results) {
            deptNames = posts.map((post) => post.name);
            return deptNames;    
        })
        console.log(deptNames);
    }
    departmentChoices();
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
        // {
        //     type: 'list',
        //     message: 'Which department does the role belong to:',
        //     choices: ,
        //     name: 'department',

        //     db.query('SELECT * FROM departmentTable', function (err, results) {
        //         console.table(results);
        //         firstQuestion();
        //     }

        //     const postIds = posts.map((post) => post.id);
            
        // },
    ])
    .then((ans) => {
        var name = ans.name;
        db.query('INSERT INTO departmentTable (department_name) VALUE (?)', name, function (err, results)  {
            console.log(`Added ${name} to database`);
            firstQuestion();
        })
    })
}



//Calling Initial start of application
firstQuestion();
