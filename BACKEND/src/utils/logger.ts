// Logger utility for consistent logging across the application

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const levelEmoji = {
      info: '✅',
      warn: '⚠️',
      error: '❌',
      debug: '🔍',
    }[level];

    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `${levelEmoji} [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private formatError(error: any): string {
    if (error instanceof Error) {
      return `${error.message}\nStack: ${error.stack}`;
    }
    return JSON.stringify(error);
  }

  info(message: string, context?: LogContext): void {
    console.log(this.formatMessage('info', message, context));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, error?: any, context?: LogContext): void {
    const errorDetails = error ? this.formatError(error) : '';
    const fullContext = { ...context, error: errorDetails };
    console.error(this.formatMessage('error', message, fullContext));
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage('debug', message, context));
    }
  }
}

export const logger = new Logger();
