// // test-connection.ts
// import { Pool } from 'pg';
// import * as dotenv from 'dotenv';

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



import { Pool, PoolClient } from 'pg';

// Configure the connection pool (replace with your actual database connection details)
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
});

// Attempt to connect to the database
pool.connect((err: Error | undefined, client: PoolClient | undefined, done: (release?: any) => void) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    
    if (!client) {
      return console.error('Error: Client is undefined');
    }
    
    console.log('Connected to the database!');
  
    // Example query to test the connection
    client.query('SELECT NOW()', (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Query executed successfully:', result.rows[0].now);
  
      // Release the client back to the pool
      done();
  
      // Optionally, close the pool entirely when done
      pool.end(() => {
        console.log('Pool has been closed');
      });
    });
  });

