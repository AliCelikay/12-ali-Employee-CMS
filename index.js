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
const init = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            name: 'firstAction',
        },
    ])
    .promise((ans) => {
        console.log(ans);
        switch(ans.firstAction)
        {
            case 'View all departments':
                viewAllDepartments();
            break;
            
            case 'View all roles':
                viewAllDepartments();
            break;

            case 'View all employees':
                viewAllDepartments();
            break;

            case 'Add a department':
                viewAllDepartments();
            break;

            case 'Add a role':
                viewAllDepartments();
            break;

            case 'Add an employee':
                viewAllDepartments();
            break;

            case 'Update an employee role':
                viewAllDepartments();
            break;

            default:
                break;

        }
    })
}

const viewAllDepartments = () => {
    db.query('SELECT * FROM departmentTable', function (err, results) {
        console.log(results);
    }
)}


//Calling Initial start of application
init();
