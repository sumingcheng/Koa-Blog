const Router = require('koa-router');
const {getUser} = require("../db/auth");
const PasswordManager = require('../utils/index');
const router = new Router();

router.post('/login', async (ctx) => {
  const {username, password} = ctx.request.body;
  const data = await getUser(username);
  const verify = await PasswordManager.comparePassword(password, data[0].password);
  console.log(verify, "*&&**&**")
  if (verify) {
    ctx.body = {
      code: 0,
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '密码错误'
    }
  }
})

module.exports = router;
