/**
 * Routes: Employee Endpoints
 * Maps incoming HTTP requests to the Employee Controller.
 */
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route for creating a new employee
router.post('/', employeeController.createEmployee);

// Route for fetching all employees
router.get('/', employeeController.getAllEmployees);

// Route for fetching a single employee by ID
router.get('/:id', employeeController.getEmployeeById);

module.exports = router;