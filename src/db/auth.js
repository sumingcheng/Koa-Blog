const MySQL = require('./index');
const PasswordManager = require('../utils/index');
// 使用查询函数
// async function main () {
//   try {
//     const [rows] = await MySQL.execute('SELECT * FROM `user`')
//     console.log(rows);
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// main().catch(console.error)

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

const result = addUser({
  username: 'root',
  email: '123123@qq.com',
  password: '123456',
  role: 'admin'
});

console.log(result)
