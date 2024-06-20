import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: "postgres://postgres:ankit@localhost:5432/postgres",
    ssl: false,
});

export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  return client;
}

export async function query(text: string, params: any[] = []): Promise<any> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}
