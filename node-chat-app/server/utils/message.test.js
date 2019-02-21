const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object', () => {
    var [from, text] = ['ermyas', 'helloworld'];
    var res = generateMessage(from, text);
    expect(res.text).toBe(text);
    expect(res.from).toBe(from);
    expect(typeof res.createdAt).toBe('number');
  })
})
