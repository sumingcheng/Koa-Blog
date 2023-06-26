const Koa = require('koa');
const app = new Koa();
const router = require('./routes');
const authRoutes = require('./routes/auth');

require('dotenv').config();
const {logger, koaLogger} = require('./middleware/logger');
const Spinner = require('./middleware/ora');
const spinner = new Spinner();
spinner.start('Starting server...');

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
