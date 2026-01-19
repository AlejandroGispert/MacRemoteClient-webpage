import { Router, Request, Response } from "express";
import { pool } from "../config/database";
import { logger } from "../utils/logger";

const router = Router();

// Endpoint: Register email and record download
router.post("/register-email", async (req: Request, res: Response) => {
  try {
    const { email, filename } = req.body;
    const requestId = (req as any).requestId || 'unknown';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    // Extract version from filename (e.g., "MacRCDesktop_v2.0.dmg" -> "2.0")
    const versionMatch = filename.match(/v?(\d+\.\d+)/);
    const version = versionMatch ? versionMatch[1] : null;

    // Check if email already exists
    const existing = await pool.query(
      'SELECT * FROM email_verifications WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      // Update existing record - increment download count
      await pool.query(
        'UPDATE email_verifications SET download_count = download_count + 1, last_download_at = CURRENT_TIMESTAMP, version = $1, filename = $2 WHERE email = $3',
        [version, filename, email]
      );
      logger.info("Email download recorded (existing)", { requestId, email, version, filename });
    } else {
      // Insert new record
      await pool.query(
        'INSERT INTO email_verifications (email, version, filename, download_count, last_download_at) VALUES ($1, $2, $3, 1, CURRENT_TIMESTAMP)',
        [email, version, filename]
      );
      logger.info("Email download recorded (new)", { requestId, email, version, filename });
    }

    res.json({ 
      success: true, 
      message: "Email registered successfully" 
    });
  } catch (error) {
    const requestId = (req as any).requestId || 'unknown';
    logger.error("Error in register-email endpoint", error, { 
      requestId, 
      email: req.body?.email,
      filename: req.body?.filename 
    });
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

export default router;
