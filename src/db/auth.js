const MySQL = require('./index');
const PasswordManager = require('../utils/index');

// 添加用户
const addUser = async (userInfo) => {
  const {username, email, password, role} = userInfo;
  // 使用预处理语句来防止SQL注入
  const sql = `INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)`;
  // 对密码进行哈希
  const hashedPassword = await PasswordManager.hashPassword(password);
  try {
    const [rows] = await MySQL.execute(sql, [username, hashedPassword, email, role]);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 删除用户
const deleteUser = async (id) => {
  const sql = `DELETE FROM user WHERE id = ?`;
  try {
    const [rows] = await MySQL.execute(sql, [id]);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// 更新用户
const updateUser = async (userInfo) => {
  const {id, username, email, password, role} = userInfo;
  const sql = `UPDATE user SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`;
  const hashedPassword = await PasswordManager.hashPassword(password);
  try {
    const [rows] = await MySQL.execute(sql, [username, email, hashedPassword, role, id]);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// 获取用户
const getUser = async (username) => {
  const sql = `SELECT * FROM user WHERE username = ?`;
  try {
    const [rows] = await MySQL.execute(sql, [username]);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

getUser('root').then(res => {
  console.log(res);
})

// const result = addUser({
//   username: 'root',
//   email: '123123@qq.com',
//   password: '123456',
//   role: 'admin'
// });

module.exports = {
  addUser, deleteUser, updateUser
}

