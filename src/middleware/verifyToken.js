const jwt = require('jsonwebtoken');
require('dotenv').config();

// 密钥
const {SECRET_KEY} = process.env;

async function verifyToken(ctx, next) {
  console.log(ctx.headers)
  const accesstoken = ctx.headers['accesstoken'];

  if (!accesstoken) {
    ctx.throw(401, 'accessToken 是必需的');
  }

  try {
    ctx.state.user = jwt.verify(accesstoken, SECRET_KEY);
    await next();
  } catch (err) {
    ctx.throw(401, 'accessToken 无效');
  }
}

module.exports = {
  verifyToken
}
