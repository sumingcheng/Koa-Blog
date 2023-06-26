const ora = require('ora');

class Spinner {
  constructor (text = 'Loading...', spinner = 'dots', colors = {
    start: 'white',
    succeed: 'green',
    fail: 'red',
    error: 'yellow',
    info: 'blue',
    warn: 'cyan'
  }) {
    if (typeof text !== 'string' || typeof spinner !== 'string' || typeof colors !== 'object') {
      throw new Error('Invalid input type');
    }

    this.spinner = ora({text, spinner});
    this.colors = colors;
  }

  // 创建一个私有方法用于更新文本和颜色
  _update (text, color) {
    if (text) {
      this.spinner.text = text;
    }
    this.spinner.color = this.colors[color];
  }

  start (text) {
    this._update(text, 'start');
    this.spinner.start();
  }

  succeed (text) {
    this._update(text, 'succeed');
    this.spinner.succeed();
  }

  fail (text) {
    this._update(text, 'fail');
    this.spinner.fail();
  }

  error (text) {
    this._update(text, 'error');
    this.spinner.fail();
  }

  info (text) {
    this._update(text, 'info');
    this.spinner.info();
  }

  warn (text) {
    this._update(text, 'warn');
    this.spinner.warn();
  }

  stop () {
    this.spinner.stop();
  }
}

module.exports = Spinner;
