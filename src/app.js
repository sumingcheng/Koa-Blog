const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
require('dotenv').config();
const {logger, koaLogger} = require('./middleware/logger');
const Spinner = require('./middleware/ora');
const spinner = new Spinner();
spinner.start('Starting server...');

// 当GET请求路径为 '/'时，响应 "服务器正常"
router.get('/', async (ctx, next) => {
  ctx.body = "服务器正常";
});

app
    .use(koaLogger())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.APP_PORT, () => {
      logger.info(`http://localhost:${process.env.APP_PORT}`);
    });

spinner.stop();
