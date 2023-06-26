// routes/auth.js

const Router = require('koa-router');
const router = new Router();

// 定义认证相关的路由
router.post('/login', async (ctx, next) => {
  // 登录逻辑
});

router.post('/register', async (ctx, next) => {
  // 注册逻辑
});

module.exports = router;
