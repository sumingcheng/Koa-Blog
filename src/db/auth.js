const MySQL = require('./index');

// 使用查询函数
async function main () {
  try {
    const [rows, fields] = await MySQL.execute('SELECT * FROM `user`')
    console.log(rows);
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error)
