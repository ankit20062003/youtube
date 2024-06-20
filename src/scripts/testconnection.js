"use strict";
// // test-connection.ts
// import { Pool } from 'pg';
// import * as dotenv from 'dotenv';
Object.defineProperty(exports, "__esModule", { value: true });
// // Load environment variables from .env file
// dotenv.config();
// const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
//   connectionString :  "postgres://postgres:ankit@localhost:5432/postgres",
//   ssl: false,
// });
// pool.connect()
//   .then(() => {
//     console.log('Connected to the database!');
//     pool.end();
//   })
//   .catch(err => {
//     console.error('Error connecting to the database:', err);
//   });
var pg_1 = require("pg");
// Configure the connection pool (replace with your actual database connection details)
var pool = new pg_1.Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // Default PostgreSQL port
});
// Attempt to connect to the database
pool.connect(function (err, client, done) {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    if (!client) {
        return console.error('Error: Client is undefined');
    }
    console.log('Connected to the database!');
    // Example query to test the connection
    client.query('SELECT NOW()', function (err, result) {
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Query executed successfully:', result.rows[0].now);
        // Release the client back to the pool
        done();
        // Optionally, close the pool entirely when done
        pool.end(function () {
            console.log('Pool has been closed');
        });
    });
});
