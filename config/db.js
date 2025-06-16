import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

const initializeDB = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(100),
        surname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS note (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(50) NOT NULL,
        text VARCHAR(300) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error initializing database:", error);
  } finally {
    client.release();
  }
};

(async () => {
  try {
    const client = await pool.connect();
    client.release();

    await initializeDB();
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Error connecting to Postgres:", error.message);
  }
})();

export default pool;
