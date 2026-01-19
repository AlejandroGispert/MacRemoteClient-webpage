import { Router, Request, Response } from "express";
import crypto from "crypto";
import { pool } from "../config/database";
import { sendVerificationEmail, isEmailConfigured } from "../config/email";
import { logger } from "../utils/logger";

const router = Router();

// Endpoint: Request email verification
router.post("/verify-email", async (req: Request, res: Response) => {
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

    const requestId = (req as any).requestId || 'unknown';

    // Check if SMTP credentials are configured
    if (!isEmailConfigured()) {
      logger.error("SMTP credentials not configured", undefined, { requestId, email });
      return res.status(500).json({ error: "Email service not configured. Please contact support." });
    }

    try {
      await sendVerificationEmail(email, verificationUrl);
      logger.info("Verification email sent successfully", { requestId, email });
    } catch (emailError: any) {
      logger.error("Error sending verification email", emailError, { requestId, email });
      if (emailError && typeof emailError === 'object' && 'code' in emailError) {
        if (emailError.code === 'EAUTH') {
          return res.status(500).json({ error: "Email authentication failed. Please check SMTP credentials." });
        }
        if (emailError.code === 'ECONNECTION') {
          return res.status(500).json({ error: "Could not connect to email server. Please try again later." });
        }
      }
      return res.status(500).json({ error: "Failed to send verification email. Please try again." });
    }

    res.json({ 
      success: true, 
      message: "Verification email sent" 
    });
  } catch (error) {
    const requestId = (req as any).requestId || 'unknown';
    logger.error("Error in verify-email endpoint", error, { requestId, email: req.body?.email });
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

// Endpoint: Verify email token
router.get("/verify/:token", async (req: Request, res: Response) => {
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

    logger.info("Email verified successfully", { 
      requestId: (req as any).requestId || 'unknown',
      email: record.email,
    });

    res.json({ 
      success: true, 
      email: record.email,
      message: "Email verified successfully" 
    });
  } catch (error) {
    const requestId = (req as any).requestId || 'unknown';
    logger.error("Error verifying token", error, { requestId, token: req.params.token });
    res.status(500).json({ error: "Failed to verify token" });
  }
});

// Endpoint: Check if email is verified
router.post("/check-verification", async (req: Request, res: Response) => {
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
    const requestId = (req as any).requestId || 'unknown';
    logger.error("Error checking verification", error, { requestId, email: req.body?.email });
    res.status(500).json({ error: "Failed to check verification" });
  }
});

// Endpoint: Increment download count
router.post("/track-download", async (req: Request, res: Response) => {
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
    const requestId = (req as any).requestId || 'unknown';
    logger.error("Error tracking download", error, { requestId, email: req.body?.email });
    res.status(500).json({ error: "Failed to track download" });
  }
});

export default router;
