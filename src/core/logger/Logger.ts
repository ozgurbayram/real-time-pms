import winston, { createLogger } from "winston";

enum LogLevels {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

class Logger {
  private logger: winston.Logger;

  public initializeWinston() {
    this.logger = createLogger({
      transports: [
        new winston.transports.File({
          filename: "info.log",
          dirname: "logs",
          level: "info",
        }),
        new winston.transports.File({
          filename: "warn.log",
          dirname: "logs",
          level: "warn",
        }),
        new winston.transports.File({
          filename: "error.log",
          dirname: "logs",

          level: "error",
        }),
      ],
    });
  }

  public logInfo(message: string) {
    this._log(LogLevels.INFO, message);
  }

  public  logWarning(message: string) {
    this._log(LogLevels.WARN, message);
  }

  public logError(message: string) {
    this._log(LogLevels.ERROR, message);
  }

  private _log(level: LogLevels, message: string, context?: string) {
    this.logger.log(level, message);
  }
}

export default Logger;
