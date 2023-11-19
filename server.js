// import mysql2
const mysql = require('mysql2');

// import inquirer 
const inquirer = require('inquirer');

const cTable = require('console.table');

//import inquirer questions from questions.js
const { mainMenuQuestions, addDepartmentQuestions, addAnEmployeeQuestions, addRoleQuestions, updateAnEmployeeQuestions } = require("./questions");



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
        console.log('Connected to MySQL database!');
    };
    startProgram();
});

//Starts the program and calls the Main Menu function to display choices

const startProgram = () => {
    console.log('  ********************************')
    console.log(' *                                *')
    console.log('*      Employee Manager Program    *')
    console.log(' *                                *')
    console.log('  ********************************')
    mainMenu();
};
//Prompts the user of different program choices

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

    connection.query(`SELECT department.id AS id, department.name AS department FROM department`, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log('Showing all departments...\n');
        console.table(res);
    });

    mainMenu()
}

//View all Roles presents a table with job title, role id, department, and the salary 
const viewAllRoles = () => {

    connection.query(`SELECT r.id, r.title, r.salary, d.name AS department FROM role r INNER JOIN department d ON r.department_id = d.id`, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log('Showing all employee roles...\n');
        console.table(res);
    });
    mainMenu();
}


//View all employees presents a table showing employee data- ids, names, salary, department, title of role, manager name

//still need to add manager
const viewAllEmployees = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, IFNULL(CONCAT(managers.first_name, " ", managers.last_name), "No Manager") AS manager FROM employee AS employee JOIN role AS role ON employee.role_id = role.id JOIN department AS department ON role.department_id = department.id LEFT JOIN employee managers ON employee.manager_id = managers.id`, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log('Showing all employees...\n');
        console.table(res);
        mainMenu();
    });
}

//Add a department prompts the user to enter the name of a new department to add to database

const addDepartment = () => {
    inquirer.prompt(addDepartmentQuestions)
        .then(response => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            connection.query(sql, [response.department], function (err, res) {
                if (err) {
                    console.log(err);
                };
                console.log('Add a department...\n');
                viewDepartments();
            });
        });
}



//Add a role prompts the user to enter the name, salary, and department for the new role

const addARole = () => {
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) {
            console.log(err);
        }
        let departments = [];
        res.forEach((department) => { departments.push({ name: department.name, value: department.id }) });

        addRoleQuestions(departments)
            .then(response => {
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                connection.query(sql, [response.title, response.salary, response.department], function (err, res) {
                    if (err) {
                        console.log(err);
                    };
                    console.log(`Added a role...\n`);
                    viewAllRoles();
                });
            });
    })
}

//Add an employee prompts the user to enter the employee’s first name, last name, role, and manager for new employee

const addAnEmployee = () => {
    connection.query(`SELECT * FROM role`, async function (err, res) {
        if (err) {
            console.log(err);
        }
        let roles = [];
        res.forEach((role) => { 
            roles.push({ name: role.title, value: role.id })
        });

        addAnEmployeeQuestions(roles)
            .then(response => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
                connection.query(sql, [response.first_name, response.last_name, response.role], function (err, res) {
                    if (err) {
                        console.log(err);
                    };
                    console.log(`Added an employee...\n`);
                    viewAllEmployees();
                });
            });
    })
}

//Update an employee prompts the user to select an employee to update their role

const updateAnEmployee = () => {
    connection.query(`SELECT * FROM employee`, async function (err, res) {
        if (err) {
            console.log(err);
        }
        let employees = [];
        res.forEach((employee) => {
            employees.push({ name: employee.first_name + " " + employee.last_name, value: employee.id })
        });
        
        var [rows, fields]  = await connection.promise().query('Select * FROM role')
        let roleData = rows.map(role => ({name: role.title, value: role.id}))
        updateAnEmployeeQuestions(employees,roleData)
            .then(response => {
                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                connection.query(sql, [parseInt(response.role_id), response.employee_id], function (err, res) {
                    if (err) {
                        console.log(err);
                    };
                    console.log(`Updated an employee...\n`);
                    viewAllEmployees();
                });
            })
    });
};

const quit = () => connection.end();


