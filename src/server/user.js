const os = require('os');

module.exports = {
  getUsername() {
    return os.userInfo().username;
  }
};
