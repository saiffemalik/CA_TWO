/**
 * Assignment Module: Server Entry Point & Database Automation
 * Student Name: Saif Ur Rehman (Student Number: 20092818)
 * NOTE ON ACADEMIC INTEGRITY & COLLABORATION:
 * The logical architecture for the automated database file-reading, query splitting,
 * and synchronization pool loop was co-developed with peer assistance from friend.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./config/db');

// Importing routes for employees and vfm cards
const employeeRoutes = require('./routes/employeeRoutes');
const vfmCardRoutes = require('./routes/vfmCardRoutes');

const app = express();
app.use(express.json()); // To handle JSON coming requests
app.use(express.static(path.join(__dirname, 'public')));

// Registering routes to their specific API endpoints
app.use('/api/employees', employeeRoutes);
app.use('/api/cards', vfmCardRoutes);

// Function to automatically setup database tables
async function setupDatabase() {
    try {
        console.log('Checking and initializing database tables...');
        
        // finding exact path of database.sql file and reading it
        const sqlPath = path.join(__dirname, 'database.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        // Breaking the entire SQL file into individual queries based on semicolon (;)
        const queries = sql.split(';').filter(query => query.trim() !== '');
        
        // Executing each SQL query in the database
        for (let query of queries) {
            await db.query(query);
        }
        
        console.log('Database tables and seed data are ready!');
    } catch (error) {
        console.error('Database initialization failed:', error.message);
    }
}




const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
   
    await setupDatabase();
});