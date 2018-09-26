const assert = require('assert');
const user = require('../src/server/user.js');

describe('API Functions', () => {
  describe('getUsername', () => {
    it('should return a non empty string', () => {
      const username = user.getUsername();
      assert.notEqual(username.length, 0, 'Username should not be empty');
    });
  });
});
