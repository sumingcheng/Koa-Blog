const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = '服务器正常';
});

module.exports = router;
