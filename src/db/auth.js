// 创建一个 async 函数来执行查询
const MySQL = require('./connect');

async function query () {
  const conn = await MySQL.getConnection();
  try {
    const results = await conn.query("SELECT * FROM user");
    console.log(results);
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
}

query();
