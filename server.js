/**
 * Assignment Module: Server Entry Point & Database Automation
 * Student Name: Saif Ur Rehman (Student Number: 20092818)
 * NOTE ON ACADEMIC INTEGRITY & COLLABORATION:
 * The logical architecture for the automated database file-reading, query splitting,
 * and synchronization pool loop was co-developed with peer assistance from a classmate/friend.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./config/db');

const app = express();
app.use(express.json()); // To handle JSON coming requests

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

// Testing for Basic default route 
app.get('/', (req, res) => {
    res.send('MaazInformatics VFM System Backend is Running!');
});


const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
   
    await setupDatabase();
});