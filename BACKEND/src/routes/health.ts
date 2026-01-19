import { Router, Request, Response } from "express";
import { pool } from "../config/database";
import { logger } from "../utils/logger";

const router = Router();

// Health check endpoint
router.get("/", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    const requestId = (req as any).requestId || 'unknown';
    logger.debug("Health check successful", { requestId, dbTime: rows[0].now });
    res.send(`Mac Remote Controller API is running! The time from the DB is ${rows[0].now}`);
  } catch (error) {
    const requestId = (req as any).requestId || 'unknown';
    logger.error("Error in health check", error, { requestId });
    res.status(500).send("Database connection error");
  }
});

export default router;
