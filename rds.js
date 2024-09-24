// CREATE DATABASE mydb;

// USE mydb;

// CREATE TABLE users (
// id INT AUTO_INCREMENT PRIMARY KEY,
// name VARCHAR(255),
// email VARCHAR(255)
// );

// INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');

// SELECT * FROM users;

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Port number for the Node.js server

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'my-rds-mysql.123456789012.ap-south-1.rds.amazonaws.com', // RDS endpoint
  user: 'admin', // RDS master username
  password: 'your-password', // RDS master password
  database: 'mydb', // Database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Route to fetch data from MySQL
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).send('Database query failed');
    }
    res.json(results); // Send the result back as JSON
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Node.js server running on http://localhost:${port}`);
});
