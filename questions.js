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

const addRoleQuestions = [
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
]

const addAnEmployeeQuestions = [
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
        name: 'role',    
        message: "What is the employee's role?"
    },
    {
        type: 'input',
        name: 'manager',
        message: "Who is the employee's manager?"
    }
]

const updateAnEmployeeQuestions = [
    {
        type: 'input',
        name: 'employee',
        message: "What is the employee's name?",
        choices: ''
    }
]

module.exports = {mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, 
                addAnEmployeeQuestions, updateAnEmployeeQuestions}