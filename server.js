//Add packages
//3rd party packages
const inquirer = require('inquirer');
const mysql = require('mysql2'); 
const cTable = require('console.table');

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
        switch(ans.firstAction)
        {
            case 'View all departments':
            break;
            
            case 'View all roles':
            break;

            case 'View all employees':
            break;

            case 'Add a department':
            break;

            case 'Add a role':
            break;

            case 'Add an employee':
            break;

            case 'Update an employee role':
            break;

        }
    })
}


//Calling Initial start of application
init();
