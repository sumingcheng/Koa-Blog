const {addUser, deleteUser, updateUser, getUser, changePassword} = require('../db/auth');
const Router = require('koa-router');
const router = new Router();
const {validateUser} = require('../middleware/validateUser');
const PasswordManager = require('../utils/index');
const {verifyToken} = require('../middleware/verifyToken');

// 获取用户
router.get('/getUser', verifyToken, async (ctx) => {
  const {username} = ctx.state.userInfo;
  const data = await getUser(username);
  ctx.body = {
    code: 0,
    msg: '获取用户成功',
    data
  }
})

// 注销用户
router.post('/deleteUser', verifyToken, async (ctx) => {
  const {username} = ctx.state.userInfo;
  const data = await deleteUser(username);
  ctx.body = {
    code: 0,
    msg: data ? '注销用户成功' : '注销用户失败',
    data
  }
})

// 添加用户
router.post('/addUser', validateUser(), async (ctx) => {
  const {username, email, password, role} = ctx.request.body;
  const data = await addUser({username, email, password, role});
  ctx.body = {
    code: 0,
    msg: data ? '添加用户成功' : '添加用户失败'
  }
})

// 更新用户
router.post('/updateUser', verifyToken, validateUser(), async (ctx) => {
  const {newUsername, email, password, role} = ctx.request.body;
  const {username} = ctx.state.userInfo;
  const getId = await getUser(username);
  const data = await updateUser({newUsername, email, password, role, id: getId[0].id});
  ctx.body = {
    code: 0,
    msg: data ? '更新用户成功' : '更新用户失败',
  }
})

// 修改密码
router.post('/updatePassword', async (ctx) => {
  const {username, oldPassword, password} = ctx.request.body;
  const data = await getUser(username);
  const verify = await PasswordManager.comparePassword(oldPassword, data[0].password);
  if (verify) {
    const update = await changePassword({username, password, id: data[0].id});
    ctx.body = {
      code: 0,
      msg: update ? '修改密码成功' : '修改密码失败',
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '原密码错误'
    }
  }
})


module.exports = router;
