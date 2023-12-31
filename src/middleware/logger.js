const winston = require("winston");
const chalk = require("chalk")

const STATUS_COLORS = {
  error: "red",
  warn: "yellow",
  info: "green",
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp({
        format: () => {
          return new Date().toLocaleString();  // 使用本地时区
        }
      }),
      winston.format.cli(),
      winston.format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
      })
  ),
  transports: [new winston.transports.Console()],
});

function koaLogger() {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;

    let logLevel;
    if (ctx.status >= 500) {
      logLevel = "error";
    } else if (ctx.status >= 400) {
      logLevel = "warn";
    } else if (ctx.status >= 100) {
      logLevel = "info";
    }

    let msg = `${ctx.method} ${ctx.originalUrl}`;

    if (ctx.method === "POST") {
      msg += ` Body: ${JSON.stringify(ctx.request.body, null, 2)}`;
    }
    msg += chalk[STATUS_COLORS[logLevel]](` ${ctx.status} ${ms}ms`);
    logger.log(logLevel, msg);
  };
}

module.exports = {logger, koaLogger};
