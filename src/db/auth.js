const MySQL = require('./index');
const PasswordManager = require('../utils/index');
const {logger} = require('../middleware/logger');

// 添加用户
const addUser = async (userInfo) => {
  const {username, email, password, role} = userInfo;
  // 使用预处理语句来防止SQL注入
  const sql = `INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)`;
  // 对密码进行哈希
  const hashedPassword = await PasswordManager.hashPassword(password);
  try {
    const [rows] = await MySQL.execute(sql, [username, hashedPassword, email, role]);
    if (rows.affectedRows === 0) {
      logger.error(`用户${username}添加失败`);
      return null;
    } else {
      logger.info(`用户${username}添加成功`);
    }
    return rows;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

// 删除用户
const deleteUser = async (username) => {
  const sql = `DELETE FROM user WHERE username = ?`;
  try {
    const [rows] = await MySQL.execute(sql, [username || null]);
    // 受影响的行数
    if (rows.affectedRows === 0) {
      logger.error(`用户${username}删除失败`);
      return null;
    } else {
      logger.info(`用户${username}删除成功`);
    }
    return rows;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

// 更新用户
const updateUser = async (userInfo) => {
  const {username, email, password, role, id} = userInfo;
  const sql = `UPDATE user SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`;
  const hashedPassword = await PasswordManager.hashPassword(password);
  try {
    const [rows] = await MySQL.execute(sql, [username, email, hashedPassword, role, id]);
    if (rows.affectedRows === 0) {
      logger.error(`用户${username}更新失败`);
      return null;
    } else {
      logger.info(`用户${username}更新成功`);
    }
    return rows;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

// 获取用户
const getUser = async (username) => {
  const sql = `SELECT * FROM user WHERE username = ?`;
  try {
    const [rows] = await MySQL.execute(sql, [username]);
    if (rows.affectedRows === 0) {
      logger.error(`用户${username}获取失败`);
      return null;
    } else {
      logger.info(`用户${username}获取成功`);
    }
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// deleteUser('test');

// getUser('root').then(res => {
//   console.log(res);
// })

// updateUser({
//   id: 5,
//   username: '寿喜烧',
//   email: 'test@qq.com',
//   password: '123456',
//   role: 'admin'
// })

// const result = addUser({
//   username: 'root',
//   email: '123123@qq.com',
//   password: '123456',
//   role: 'admin'
// });

module.exports = {
  addUser,
  deleteUser,
  updateUser,
  getUser
}

