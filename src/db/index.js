const MySQL = require('./connect');
const {logger} = require('../middleware/logger');

// 测试连接
MySQL.getConnection()
    .then(conn => {
      conn.release();
      logger.info('Successfully connected to the database.');
    })
    .catch(err => {
      logger.error('Failed to connect to the database: ', err);
    });

module.exports = MySQL
