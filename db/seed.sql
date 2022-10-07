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
VALUES ("Naruto", "Uzumaki", 2, NULL),
        ("Sasuke", "Uchiha", 1, 1),
        ("Sakura", "Haruno", 2, NULL),
        ("Kakashi", "Hatake", 3, 2),
        ("Jiraya", "Unknown", 6, NULL),
        ("Rock", "Lee", 4, 4),
        ("Itachi", "Uchiha", 4, NULL),
        ("Neji", "Hyuga", 7, 3),
        ("Madara", "uchiha", 5, 4),
        ("Shikamaru", "Nara", 8, NULL);
