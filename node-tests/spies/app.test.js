const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');
describe('App', () => {
  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy({
      name: 'Ermyas',
      age: 22
    });
    expect(spy).toHaveBeenCalledWith({
      name: 'Ermyas',
      age: 22
    });
  })
})



describe('db', () => {
  var db = {
    saveUser: expect.createSpy()
  };

  app.__set__('db', db);
  it('should call saveUser with user object', () => {
    var email = 'ermyas@example.com';
    var password = '123.abc';

    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password})
  })

})
