const bcrypt = require('bcryptjs');
const {logger} = require('../middleware/logger');

class PasswordManager {
  // 设置哈希的复杂度
  static saltRounds = 10;

  // 加密密码
  static async hashPassword (password) {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (err) {
      logger.error('Failed to hash password: ', err);
      throw err;
    }
  }

  // 验证密码
  static async comparePassword (password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      logger.error('Failed to compare password: ', err);
      throw err;
    }
  }
}

module.exports = PasswordManager;
