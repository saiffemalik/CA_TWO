/**
 * Routes: Employee Endpoints
 * Maps incoming HTTP requests to the Employee Controller.
 */
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route for creating a new employee
router.post('/', employeeController.createEmployee);

module.exports = router;