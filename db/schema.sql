DROP DATABASE IF EXISTS employeeCMS_db;
CREATE DATABASE employeeCMS_db;

USE employeeCMS_db;

CREATE TABLE departmentTable (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE rolesTable (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departmentTable(id)
  ON DELETE SET NULL
);

CREATE TABLE employeeTable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES rolesTable(id),
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employeeTable(id)
  ON DELETE SET NULL
);

