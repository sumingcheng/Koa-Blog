const {logger} = require('../middleware/logger');
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

// 测试连接
pool.getConnection()
    .then(conn => {
      conn.release();
      logger.info('Successfully connected to the database.');
    })
    .catch(err => {
      logger.error('Failed to connect to the database: ', err);
    });

module.exports = pool
