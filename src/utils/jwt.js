const jwt = require('jsonwebtoken');
require('dotenv').config();

// 密钥
const {SECRET_KEY} = process.env

function generateAToken(id, username, role) {
  let payload = {
    username: username,
    id: id,
    role: role
  };

  // 生成 token
  return jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'});
}

module.exports = {
  generateAToken
}
