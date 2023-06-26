const Koa = require('koa');
const app = new Koa();
require('dotenv').config();

const router = require('./routes');
const authRoutes = require('./routes/auth');

const {logger, koaLogger} = require('./middleware/logger');
const Spinner = require('./middleware/ora');
const spinner = new Spinner();

spinner.start('Starting server...');

// 将数据库连接对象添加到 Koa 的 context 中
app
    .use(koaLogger())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(authRoutes.routes())
    .use(authRoutes.allowedMethods())
    .listen(process.env.APP_PORT, () => {
      logger.info(`http://localhost:${process.env.APP_PORT}`);
    });

spinner.stop();
