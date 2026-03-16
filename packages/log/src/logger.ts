import { LogLevel, type LoggerOptions } from "./types";

class Logger {
  private level: LogLevel = LogLevel.INFO;
  private prefix: string;

  constructor(options?: LoggerOptions) {
    this.prefix = options?.prefix ?? "ALISA-SDK";
    this.level = options?.level ?? LogLevel.INFO;
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  private shouldLog(level: LogLevel) {
    return level >= this.level;
  }

  private getPrefix(level: string, color: string) {
    return `%c[${this.prefix}] %c[${level}]`;
  }

  private getStyle(color: string) {
    return [`color: ${color}; font-weight: bold;`, "color: inherit;"];
  }

  debug(msg: string, ...args: any[]) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(
        this.getPrefix("DEBUG", "#7f8c8d"),
        ...this.getStyle("#7f8c8d"),
        msg,
        ...args
      );
    }
  }

  info(msg: string, ...args: any[]) {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(
        this.getPrefix("INFO", "#2ecc71"),
        ...this.getStyle("#2ecc71"),
        msg,
        ...args
      );
    }
  }

  warn(msg: string, ...args: any[]) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(
        this.getPrefix("WARN", "#f1c40f"),
        ...this.getStyle("#f1c40f"),
        msg,
        ...args
      );
    }
  }

  error(msg: string, ...args: any[]) {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(
        this.getPrefix("ERROR", "#e74c3c"),
        ...this.getStyle("#e74c3c"),
        msg,
        ...args
      );
    }
  }
}

// 导出单例
export const logger = new Logger();
// 同时也导出类，方便用户自己创建不同前缀的 logger
export { Logger };
