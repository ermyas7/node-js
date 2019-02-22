const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object', () => {
    var [from, text] = ['ermyas', 'helloworld'];
    var res = generateMessage(from, text);
    expect(res.text).toBe(text);
    expect(res.from).toBe(from);
    expect(typeof res.createdAt).toBe('number');
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var [from, lat, long] = ['ermyas', 23, 88];
    var res = generateLocationMessage(from, lat, long);
    expect(res.from).toBe(from);
    expect(res.url).toBe('https://www.google.com/maps?q=23,88');
    expect(typeof res.createdAt).toBe('number');
  })
})
