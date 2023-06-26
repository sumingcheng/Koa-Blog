// routes/auth.js

const Router = require('koa-router');
const router = new Router();

// 定义认证相关的路由
router.get('/users', async (ctx) => {
  try {
    const query = 'SELECT * FROM users';
    // 执行数据库查询
    ctx.body = await ctx.db.query(query);  // 将查询结果作为响应发送回客户端
  } catch (err) {
    console.error('Error executing MySQL query: ' + err);
    ctx.status = 500;  // 设置错误状态码
    ctx.body = 'An error occurred';
  }
});

module.exports = router;
