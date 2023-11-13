// import mysql2
const mysql = require('mysql2');

// import inquirer 
const inquirer = require('inquirer');

//import inquirer questions from questions.js
const { mainMenuQuestions, addDepartmentQuestions, addRoleQuestions,
    addAnEmployeeQuestions, updateAnEmployeeQuestions } = require("./questions");



// connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_db'
});

connection.connect((error) => {
    if (error) {
        console.log('Error connecting to MySQL datatebase:', error);
    } else {
        console.log('Connected to MySQL database!)');
    };
    startProgram();
});

const startProgram = () => {
    console.log('  ********************************')
    console.log(' *                                *')
    console.log('*      Employee Manager Program    *')
    console.log(' *                                *')
    console.log('  ********************************')
    mainMenu();
};

const mainMenu = () => {
    inquirer
        .prompt(mainMenuQuestions).then(answers => {
            switch (answers.selection) {
                case 'View all departments':
                    viewDepartments()
                    break;
                case 'View all roles':
                    viewAllRoles()
                    break;
                case 'View all employees':
                    viewAllEmployees()
                    break;
                case 'Add a department':
                    addDepartment()
                    break;
                case 'Add a role':
                    addARole()
                    break;
                case 'Add an employee':
                    addAnEmployee()
                    break;
                case 'Update an employee':
                    updateAnEmployee()
                    break;
                case 'Quit':
                    quit()
                    break;
                default:
                    connection.end()
                    break;
            }
        });
}

//View all Departments Table presents a table with department names and department ids
const viewDepartments = () => {
    console.log('Showing all departments...\n');

    connection.query(`SELECT department.id AS id, department.name AS department FROM department`, function (err, results){
        if(err) {
            console.log(err);
        }
        console.log(results);
    });

    mainMenu()
}


//View all Roles presents a table with job title, role id, 
//the department that role belongs to, and the salary for that role
const viewAllRoles = () => {
    console.log('Showing all employee roles...\n');


    const table = 'SELECT role.id AS id, role.title AS title, role.salary AS salary FROM role JOIN role ON department.name = role.id'
    mainMenu();
}


//View all employees presents a table showing employee data, including employee ids, 
//first names, last names, job titles, departments, salaries, and managers that the 
//employees report to
const viewAllEmployees = () => {
    console.log('Showing all employee data...\n');
    const table = 
    mainMenu();
}


//Add a department prompts the user to enter the name of the department 
//and that department is added to the database
const addDepartment = () => {
    inquirer
        .prompt(addDepartmentQuestions);

    mainMenu()
}


//Add a role prompts the user to enter the name, salary, and department for 
//the role and that role is added to the database

const addARole = () => {
    inquirer
        .prompt(addRoleQuestions);

    mainMenu()
}


//Add an employee prompts the user to enter the employee’s first name, last name, role, 
//and manager, and that employee is added to the database

const addAnEmployee = () => {
    inquirer
        .prompt(addAnEmployeeQuestions);

    mainMenu()
}



//Update an employee role prompts the user to select an employee to 
//update and their new role and this information is updated in the database 

const updateAnEmployee = () => {
    inquirer
        .prompt(updateAnEmployeeQuestions);

    mainMenu()
}

//Quit Application

const quit = () => connection.end();
