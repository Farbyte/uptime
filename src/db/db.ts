import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Required if SSL mode is not set to 'require'
  },
  connectionTimeoutMillis: 5000, // Optional: Timeout in milliseconds
  connectionString: `project=${ENDPOINT_ID}`, // Optional: Connection string options
});

export default pool;
