const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string value', () => {
    var res = isRealString(23);
    expect(res).toBe(false);
  })

  it('should reject string with only space', () => {
    var res = isRealString('  ');
    expect(res).toBe(false);
  })

  it('should allow string with non-space character', () => {
    var res = isRealString('  hello  ');
    expect(res).toBe(true);
  })

})
