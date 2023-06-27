const {addUser, deleteUser, updateUser, getUser} = require('../db/auth');
const Router = require('koa-router');
const router = new Router();
const {validateUserMiddleware} = require('../middleware/validateUserMiddleware');

// 获取用户
router.get('/getUser', async (ctx) => {
  const {username} = ctx.query;
  const data = await getUser(username);
  ctx.body = {
    code: 0,
    msg: '获取用户成功',
    data
  }
})

// 注销用户
router.post('/deleteUser', async (ctx) => {
  console.log(ctx.request.body)
  const {username} = ctx.request.body;
  const data = await deleteUser(username);
  ctx.body = {
    code: 0,
    msg: data ? '注销用户成功' : '注销用户失败',
    data
  }
})

// 添加用户
router.post('/addUser', async (ctx) => {
  const {username, email, password, role} = ctx.request.body;
  const data = await addUser({username, email, password, role});
  ctx.body = {
    code: 0,
    msg: data ? '添加用户成功' : '添加用户失败'
  }
})

// 更新用户
router.post('/updateUser', validateUserMiddleware(), async (ctx) => {
  const {username, email, password, role} = ctx.request.body;
  const getId = await getUser(username);
  const data = await updateUser({username, email, password, role, id: getId[0].id});
  ctx.body = {
    code: 0,
    msg: data ? '更新用户成功' : '更新用户失败',
  }
})


module.exports = router;
