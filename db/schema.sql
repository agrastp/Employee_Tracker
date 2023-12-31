DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (20, 2) NOT NULL,
    department_id INT,
    INDEX dep_ind (department_id),
        CONSTRAINT key_department FOREIGN KEY (department_id) 
        REFERENCES department(id)
        ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) 
    REFERENCES role(id) 
    ON DELETE SET NULL,
    manager_id INT NULL,
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id) 
    ON DELETE SET NULL
);

