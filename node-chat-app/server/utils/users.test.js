const expect = require('expect');

var {Users} = require('./users');

describe('Users', () => {
  var user;
  beforeEach(() => {
    user = new Users();
    user.users = [
      {
        id: 1,
        name: 'Ermyas',
        room: 'node course'
      },
      {
        id: 2,
        name: 'Bereket',
        room: 'vuejs'
      },
      {
        id: 3,
        name: 'Tensae',
        room: 'node course'
      }
    ];
  })
  it('Should add a new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Ermyas',
      room: 'coding'
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  })

  it('Should return name(s) for node course', () => {
    var userList = user.getUserList('node course');
    expect(userList).toEqual(['Ermyas', 'Tensae']);
  })

  it('Should return name(s) for node course', () => {
    var userList = user.getUserList('vuejs');
    expect(userList).toEqual(['Bereket']);
  })

  it('Should find user for valid id', () => {
    var res = user.getUser(1);
    expect(res).toEqual({
      id: 1,
      name: 'Ermyas',
      room: 'node course'
    });
  })

  it('Should not find user for invalid id', () => {
    var res = user.getUser(111);
    expect(res).toBeFalsy();
  })

  it('Should remove user for valid id', () => {
    var res = user.removeUser(1);
    expect(res).toEqual({
      id: 1,
      name: 'Ermyas',
      room: 'node course'
    });
    expect(user.users.length).toBe(2);
  })

  it('Should not remove user for invalid id', () => {
    var res = user.removeUser(111);
    expect(res).toBeFalsy();
    expect(user.users.length).toBe(3);
  })
})
