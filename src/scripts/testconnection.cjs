"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test-connection.ts
var pg_1 = require("pg");
var dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();
var pool = new pg_1.Pool({
    connectionString: "postgres://postgres:ankit@localhost:5432/postgres",
    ssl: false,
});

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the database!');
  
    // Example query to test the connection
    // client.query('INSERT INTO videos (title , description , video_url) values ($1 ,$2 ,$3) RETURNING *;',['hi', 'hwlo' , 'bye'] ,(err, result) => {
    //   release(); // Release the client back to the pool
    client.query('SELECT * FROM videos;', (err, result) => {
  
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Query executed successfully:', result.rows);
  
      // Optionally, close the pool entirely when done
      pool.end(() => {
        console.log('Pool has been closed');
      });
    });
  });
