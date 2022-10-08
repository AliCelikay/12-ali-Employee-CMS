-- SELECT employeeTable.id, 
-- employeeTable.first_name,
-- employeeTable.last_name,
-- rolesTable.role_title,
-- departmentTable.department_name AS department,
-- rolesTable.role_salary,
-- -- CONCAT(employeeTable.first_name, " ", employeeTable.last_name) AS manager 
-- employeeTable.manager_id AS manager
-- FROM employeeTable
-- -- FROM employeeTable
-- LEFT JOIN rolesTable
-- -- --   set the employee id = roles id and the rolesTable.role_title will grab the title 
-- ON employeeTable.role_id = rolesTable.id
-- LEFT JOIN departmentTable
-- ON rolesTable.department_id = departmentTable.id;
-- -- LEFT JOIN employeeTable.manager_id = CONCAT(employeeTable.first_name, " ", employeeTable.last_name);
-- -- ON employeeTable.manager_id = CONCAT(employeeTable.first_name, " ", employeeTable.last_name);



SELECT employeeTable.id, 
employeeTable.first_name,
employeeTable.last_name,
rolesTable.role_title,
departmentTable.department_name AS department,
rolesTable.role_salary,
employeeTable.manager_id AS manager,
CONCAT (manager.first_name, ' ', manager.last_name) AS manager
FROM employeeTable
LEFT JOIN rolesTable
ON employeeTable.role_id = rolesTable.id
LEFT JOIN departmentTable
ON rolesTable.department_id = departmentTable.id
LEFT JOIN employeeTable manager ON manager.id = employeeTable.manager_id
;


-- SELECT employeeTable.id,
-- employeeTable.first_name,
-- employeeTable.last_name, 
-- rolesTable.role_title, 
-- departmentTable.department_name AS departments, 
-- rolesTable.role_salary, 
-- CONCAT (manager.first_name, ' ', manager.last_name) AS manager
-- FROM employeeTable
-- LEFT JOIN rolesTable ON employeeTable.id = rolesTable.id
-- LEFT JOIN departmentTable ON rolesTable.department_id = departmentTable.id
-- LEFT JOIN employeeTable manager ON manager.id = employeeTable.manager_id;

