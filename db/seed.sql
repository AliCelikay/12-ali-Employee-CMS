INSERT INTO departmentTable (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO rolesTable (role_title, role_salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawer", 190000, 3);

INSERT INTO employeeTable (first_name, last_name, role_id, manager_id)
VALUES ("Naruto", "Uzumaki", 1, NULL),
        ("Sasuke", "Uchiha", 2, 1),
        ("Sakura", "Haruno", 2, NULL),
        ("Kakashi", "Hatake", 3, 2),
        ("Jiraya", "Unknown", 1, 3),
        ("Rock", "Lee", 4, 4),
        ("Itachi", "Uchiha", 4, NULL),
        ("Neji", "Hyuga", 3, NULL),
        ("Shikamaru", "Nara", 1, NULL);
