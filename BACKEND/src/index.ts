import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import { initializeDatabase } from "./config/database";
import { corsMiddleware } from "./middleware/cors";
import { requestLogger, errorHandler } from "./middleware/errorHandler";
import verificationRoutes from "./routes/verification";
import healthRoutes from "./routes/health";
import { logger } from "./utils/logger";

const app = express();
const port = process.env.PORT || 3333;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(requestLogger); // Request logging middleware
app.use(corsMiddleware);

// Initialize database on startup
initializeDatabase().catch((error) => {
  logger.error("Failed to initialize database", error);
  process.exit(1);
});

// Routes
app.use("/api", verificationRoutes);
app.use("/", healthRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Mac Remote Controller API listening on port ${port}`, { port, env: process.env.NODE_ENV || 'development' });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', reason, { promise });
  process.exit(1);
});
