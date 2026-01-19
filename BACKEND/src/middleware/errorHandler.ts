import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// Request logging middleware
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  // Attach request ID to request object for use in routes
  (req as any).requestId = requestId;

  logger.info(`Incoming ${req.method} ${req.path}`, {
    requestId,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.get('user-agent'),
  });

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? 'error' : 'info';
    const logMethod = level === 'error' ? logger.error.bind(logger) : logger.info.bind(logger);
    
    logMethod(`${req.method} ${req.path} ${res.statusCode}`, {
      requestId,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}

// Global error handler middleware
export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId = (req as any).requestId || 'unknown';

  logger.error('Unhandled error', error, {
    requestId,
    method: req.method,
    path: req.path,
    ip: req.ip || req.socket.remoteAddress,
  });

  res.status(500).json({
    error: 'An unexpected error occurred',
    requestId,
    ...(process.env.NODE_ENV === 'development' && { 
      message: error?.message,
      stack: error?.stack,
    }),
  });
}
