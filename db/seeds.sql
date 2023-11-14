INSERT INTO department (id, name)
VALUES (001, 'Human Resources'),
       (002, 'IT'),
       (003, 'Administration'),
       (004, 'Accounting'),
       (005, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES (5, 'Human Resource Director', 65035, 001),
       (4, 'Computer Tech', 42098, 002), 
       (3, 'CEO', 156987, 003), 
       (2, 'Accountant', 75063, 004),
       (1, 'Sales Manager', 64762, 005);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (123, 'John', 'Newman', 4, 654),
       (345, 'David', 'Host', 5, null),
       (624, 'Ella', 'Greene', 1, 523),
       (723, 'Rachel', 'Zellner', 3, null), 
       (985, 'Homer', 'Simpson', 2, 237);