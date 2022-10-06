SELECT employeeTable.id AS id, employeeTable.first_name AS first_name, employeeTable.last_name AS last_name, rolesTable.role_title AS title
  FROM employeeTable
  LEFT JOIN rolesTable
--   set the employee id = roles id and the rolesTable.role_title will grab the title 
  ON employeeTable.role_id = rolesTable.id;
