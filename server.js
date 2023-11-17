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
                    connection.end()
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


//View all Roles presents a table with job title, role id, 
//the department that role belongs to, and the salary for that role
const viewAllRoles = () => {

    connection.query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log('Showing all employee roles...\n');
        console.table(res);
    });
    mainMenu();
}


//View all employees presents a table showing employee data, including employee ids, 
//first names, last names, job titles, departments, salaries, and managers that the 
//employees report to

//still need to add manager
const viewAllEmployees = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee AS employee LEFT JOIN role AS role ON employee.role_id = role.id LEFT JOIN department AS department ON role.department_id = department.id`, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log('Showing all employees...\n');
        console.table(res);
    });
    mainMenu();
}

//Add a department prompts the user to enter the name of the department 
//and that department is added to the database
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
            mainMenu();
        });
}



//Add a role prompts the user to enter the name, salary, and department for 
//the role and that role is added to the database

const addARole = () => {
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) {
            console.log(err);
        }
        let departments = [];
        res.forEach((department) => {departments.push({name: department.name, value: department.id}) });

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
        mainMenu();
    });
})
}

//Add an employee prompts the user to enter the employee’s first name, last name, role, 
//and manager, and that employee is added to the database

const addAnEmployee = () => {
    connection.query(`SELECT * FROM role`, function (err, res) {
        if (err) {
            console.log(err);
        }
        let roles = [];
        res.forEach((role) => {roles.push({name: role.title, value: role.id}) });

    addAnEmployeeQuestions(roles)
    .then(response => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        connection.query(sql, [response.first_name, response.last_name, response.role, response.manager.id], function (err, res) {
            if (err) {
                console.log(err);
            };
            console.log(`Added an employee...\n`);
            viewAllEmployees();
        });
        mainMenu();
    });
})
}

//Update an employee role prompts the user to select an employee to 
//update and their new role and this information is updated in the database 

const updateAnEmployee = () => {
    connection.query(`SELECT * FROM employee`, function (err, res) {
        if (err) {
            console.log(err);
        }
        let employees = [];
        res.forEach((employee) => {employees.push({name: employee.first_name + " " + employee.last_name, value: employee.id}) 
    });

    updateAnEmployeeQuestions (employees)
        .then(response => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
            connection.query(sql, [response.role_id], function (err, res) {
                if (err) {
                    console.log(err);
                };
                console.log(`Updated an employee...\n`);
                viewAllEmployees();
            });
            mainMenu();

        })
    });
}


