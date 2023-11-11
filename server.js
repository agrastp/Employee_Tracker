// import mysql2
const mysql = require('mysql2')
// import inquirer 
const inquirer = require('inquirer'); 


// connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db'
});


inquirer
    .prompt([
        {
            type: 'choice',
            name: 'selection',
            message: 'Select what you would like to do.',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee'
            ]
        }
    ]);

// WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids



// WHEN I choose to view all roles
//THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role




//WHEN I choose to view all employees
//THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, 
//job titles, departments, salaries, and managers that the employees report to



//WHEN I choose to add a department
//THEN I am prompted to enter the name of the department and that department is added to the database

inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Add the name of the department.' 
        }
    ]);


//WHEN I choose to add a role
//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

inquirer
    .prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Add the name of the new role.' 
        }, 
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'department',     //do we use the same key here as above?
            message: 'Which department is this role for?'
        }
    ]);



//WHEN I choose to add an employee
//THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

inquirer
    .prompt([
        {
            type: 'input',
            name: 'first',
            message: "What is the employee's first name?"
        }, 
        {
            type: 'input',
            name: 'last',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role',     //do we use the same key here as above?
            message: "What is the employee's role?"
        },
        {
            type: 'input',
            name: 'manager',    
            message: "Who is the employee's manager?"
        },
    ]);




//WHEN I choose to update an employee role
//THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

inquirer
    .prompt([
        {
            type: 'choice',
            name: 'employee',
            message: "What is the employee's name?",
            choices: ''
        }, 

    ]);