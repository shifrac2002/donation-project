require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
});

const sql = fs.readFileSync('../backup.sql', 'utf8');

connection.query(sql, (err) => {
  if (err) {
    console.error('Error importing data:', err);
  } else {
    console.log('Tables and data imported successfully');
  }
  connection.end();
});
