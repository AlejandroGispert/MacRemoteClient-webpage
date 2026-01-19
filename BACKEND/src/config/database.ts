import pg from "pg";
import { logger } from "../utils/logger";

// Connect to the database using the DATABASE_URL environment variable
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  logger.error('DATABASE_URL environment variable is not set!');
  process.exit(1);
}

logger.info('Database connection configured', {
  urlLength: databaseUrl.length,
  url: databaseUrl.replace(/:[^:@]+@/, ':****@'), // Hide password in logs
});

export const pool = new pg.Pool({
  connectionString: databaseUrl,
});

// Handle database connection errors
pool.on('error', (error) => {
  logger.error('Unexpected database pool error', error);
});

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Check if table exists and has old schema
    const tableCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'email_verifications'
    `);

    const hasOldSchema = tableCheck.rows.some((row: any) => row.column_name === 'verification_token');

    if (hasOldSchema) {
      logger.warn('Old schema detected. Dropping and recreating table with new schema...');
      // Drop old table and recreate with new schema
      await pool.query('DROP TABLE IF EXISTS email_verifications CASCADE');
      logger.info('Old table dropped');
    }

    // Create table with new schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS email_verifications (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        version VARCHAR(50),
        filename VARCHAR(255),
        download_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_download_at TIMESTAMP
      )
    `);
    
    // Create index for faster lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_email_verifications_email 
      ON email_verifications(email)
    `);
    
    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error('Database initialization error', error);
    throw error;
  }
}
