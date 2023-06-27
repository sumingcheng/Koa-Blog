const {logger} = require("./logger");
const {validRoles} = require("../dictionary");

function validateUserMiddleware () {
  return async (ctx, next) => {
    const {username, email, password, role} = ctx.request.body;

    // 检查用户名长度是否大于10
    if (username && username.length < 3) {
      logger.error('无效的用户名，长度必须大于3');
      ctx.throw(400, '无效的用户名，长度必须大于3');
      return;
    }

    // 检查email是否有效。
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (email && !emailRegex.test(email)) {
      logger.error('无效的邮箱');
      ctx.throw(400, '无效的邮箱');
      return;
    }

    // 检查密码长度是否大于
    if (password && password.length <= 7) {
      logger.error('无效的密码，长度必须大于7位');
      ctx.throw(400, '无效的密码，长度必须大于7位');
      return;
    }

    // 检查role是否是预定义的一种
    if (role && !validRoles.includes(role)) {
      logger.error('无效的角色');
      ctx.throw(400, '无效的角色');
      return;
    }

    // 如果所有校验都通过，传递控制权给下一个中间件
    await next();
  };
}


module.exports = {
  validateUserMiddleware
}
