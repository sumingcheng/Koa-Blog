const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const {logger, koaLogger} = require('./middleware/logger');
require('dotenv').config();


// 当GET请求路径为 '/'时，响应 "服务器正常"
router.get('/', async (ctx, next) => {
  ctx.body = "服务器正常";
});

// 使用路由中间件
app
    .use(koaLogger())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.APP_PORT, () => {
  logger.info(`http://localhost:${process.env.APP_PORT}`);
});
