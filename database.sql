-- Create Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL
);

-- Create VFM Cards Table
CREATE TABLE IF NOT EXISTS vfm_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    card_number VARCHAR(16) UNIQUE NOT NULL,
    grocery_allowance DECIMAL(10, 2) DEFAULT 180.00,
    reward_points INT DEFAULT 0,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Insert Dummy Data if tables are empty
INSERT INTO employees (id, name, email, department) 
SELECT 1, 'Saif Ur Rehman', 'saif@maazinformatics.com', 'IT'
WHERE NOT EXISTS (SELECT 1 FROM employees WHERE id = 1);

INSERT INTO employees (id, name, email, department) 
SELECT 2, 'John Doe', 'john@maazinformatics.com', 'HR'
WHERE NOT EXISTS (SELECT 1 FROM employees WHERE id = 2);

INSERT INTO vfm_cards (employee_id, card_number, grocery_allowance, reward_points)
SELECT 1, '1234567890123456', 180.00, 50
WHERE NOT EXISTS (SELECT 1 FROM vfm_cards WHERE employee_id = 1);