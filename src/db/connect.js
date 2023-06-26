const mysql = require('mysql2/promise');

// 创建一个连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password: '123456'
});

module.exports = pool
