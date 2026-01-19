import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Connect to the database using the DATABASE_URL environment variable injected by Railway
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  process.exit(1);
}

console.log('✅ DATABASE_URL: Set (length: ' + databaseUrl.length + ')');
console.log('✅ Connecting to:', databaseUrl.replace(/:[^:@]+@/, ':****@')); // Hide password in logs

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
  
  if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Create database table if it doesn't exist
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS email_verifications (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        verification_token VARCHAR(255) UNIQUE NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        download_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        verified_at TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Initialize database on startup
initializeDatabase();

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Endpoint: Request email verification
app.post("/api/verify-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationUrl = `${process.env.FRONTEND_URL || 'https://macremotecontrollerwebpage.netlify.app'}/verify?token=${verificationToken}`;

    // Check if email already exists
    const existing = await pool.query(
      'SELECT * FROM email_verifications WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      // Update existing record with new token
      await pool.query(
        'UPDATE email_verifications SET verification_token = $1, verified = FALSE WHERE email = $2',
        [verificationToken, email]
      );
    } else {
      // Insert new record
      await pool.query(
        'INSERT INTO email_verifications (email, verification_token) VALUES ($1, $2)',
        [email, verificationToken]
      );
    }

    // Send verification email
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@macremotecontroller.com',
      to: email,
      subject: 'Verify Your Email - Mac Remote Controller Download',
      html: `
        <h2>Verify Your Email</h2>
        <p>Click the link below to verify your email and download the Mac Remote Controller app:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>Or copy and paste this link:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP credentials not configured");
      return res.status(500).json({ error: "Email service not configured. Please contact support." });
    }

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: "Verification email sent" 
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

// Endpoint: Verify email token
app.get("/api/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const result = await pool.query(
      'SELECT * FROM email_verifications WHERE verification_token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Invalid or expired token" });
    }

    const record = result.rows[0];

    // Mark as verified
    await pool.query(
      'UPDATE email_verifications SET verified = TRUE, verified_at = CURRENT_TIMESTAMP WHERE verification_token = $1',
      [token]
    );

    res.json({ 
      success: true, 
      email: record.email,
      message: "Email verified successfully" 
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ error: "Failed to verify token" });
  }
});

// Endpoint: Check if email is verified
app.post("/api/check-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await pool.query(
      'SELECT verified FROM email_verifications WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ verified: false });
    }

    res.json({ verified: result.rows[0].verified });
  } catch (error) {
    console.error("Error checking verification:", error);
    res.status(500).json({ error: "Failed to check verification" });
  }
});

// Endpoint: Increment download count
app.post("/api/track-download", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await pool.query(
      'UPDATE email_verifications SET download_count = download_count + 1 WHERE email = $1',
      [email]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error tracking download:", error);
    res.status(500).json({ error: "Failed to track download" });
  }
});

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT NOW()");
  res.send(`Mac Remote Controller API is running! The time from the DB is ${rows[0].now}`);
});

app.listen(port, () => {
  console.log(`Mac Remote Controller API listening at http://localhost:${port}`);
});

