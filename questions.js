const inquirer = require('inquirer');

const mainMenuQuestions = [
    {
        type: 'list',
        name: 'selection',
        message: 'Select what you would like to do.',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee',
            'Quit'
        ]
    }
]

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'department',
        message: 'Add the name of the department.'
    }
]

const addRoleQuestions = (departments) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Add the name of the new role.'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department is this role for?',
            choices: departments
        }
    ])
};

const addAnEmployeeQuestions = (roles) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roles
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is the employee's manager?"
        }
    ])
};

const updateAnEmployeeQuestions = (employees) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: "What is the employee's name?",
            choices: employees
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's new role?",
        }
    ]
    )
};

module.exports = {mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addAnEmployeeQuestions, updateAnEmployeeQuestions};