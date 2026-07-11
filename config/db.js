const mysql = require('mysql2');

// Creating the connection pool to the MySQL database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'maazinformatics_vfm', // Name of Database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool promise wrapper to use async/await in routes
module.exports = pool.promise();