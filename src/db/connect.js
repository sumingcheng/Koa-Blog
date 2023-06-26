const mysql = require('mysql2/promise');

// 创建一个连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password: '123456',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

module.exports = pool;
