import nodemailer from "nodemailer";
import { logger } from "../utils/logger";

// Email transporter setup
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Check if SMTP credentials are configured
export function isEmailConfigured(): boolean {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS);
}

// Send verification email
export async function sendVerificationEmail(
  email: string,
  verificationUrl: string
): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error("SMTP credentials not configured");
  }

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

  await transporter.sendMail(mailOptions);
  logger.info('Verification email sent', { email });
}
