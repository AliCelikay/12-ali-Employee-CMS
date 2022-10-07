SELECT employeeTable.id AS id, 
employeeTable.first_name AS first_name,
employeeTable.last_name AS last_name,
rolesTable.role_title AS title,
departmentTable.department_name AS department,
rolesTable.role_salary AS salary,
-- CONCAT(employeeTable.first_name, " ", employeeTable.last_name) AS manager,
employeeTable.manager_id AS manager
FROM employeeTable
LEFT JOIN rolesTable
-- --   set the employee id = roles id and the rolesTable.role_title will grab the title 
ON employeeTable.role_id = rolesTable.id
LEFT JOIN departmentTable
ON rolesTable.department_id = departmentTable.id
AND employeeTable.manager_id = CONCAT(employeeTable.first_name, " ", employeeTable.last_name);
