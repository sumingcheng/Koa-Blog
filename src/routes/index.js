const Router = require('koa-router');
const {getUser} = require("../db/auth");
const PasswordManager = require('../utils/index');
const router = new Router();
const {generateAToken} = require('../utils/jwt');

router.post('/login', async (ctx) => {
  try {
    const {username, password} = ctx.request.body;

    if (!username || !password) {
      ctx.body = {
        code: 1,
        msg: '用户名或密码不能为空',
        accessToken: null
      };
      return;
    }

    const data = await getUser(username);

    if (!data || data.length === 0) {
      ctx.body = {
        code: 1,
        msg: '用户不存在',
        accessToken: null
      };
      return;
    }

    const verify = await PasswordManager.comparePassword(password, data[0].password);

    if (verify) {
      let accessToken = generateAToken(data[0].id, data[0].username, data[0].role)
      ctx.body = {
        code: 0,
        msg: '登录成功',
        accessToken
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '密码错误',
        accessToken: null
      };
    }
  } catch (error) {
    ctx.body = {
      code: 1,
      msg: '服务器错误',
      accessToken: null
    };
  }
});


module.exports = router;
