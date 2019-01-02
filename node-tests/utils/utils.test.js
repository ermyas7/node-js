const expect = require('expect')
const utils = require('./utils')

describe('utils', () => {

  describe('#add', () => {
    it('should add two numbers', () => {
      var res = utils.add(15, 32);
      expect(res).toBe(47).toBeA('number');
    })

    it('should async add 2 numbers', (done) => {
      utils.asyncAdd(12, 11, (sum) => {
        expect(sum).toBe(23).toBeA('number');
        done();
      } )
    })
  })

  describe('#square', () => {
    it("should square a number", () => {
      var res = utils.square(9);
      expect(res).toBe(81).toBeA('number');
    })

    it("should async square a number", (done) => {
      utils.asyncSquare(9, (res) =>{
        expect(res).toBe(81).toBeA('number');
        done();
      } )
    })
  })
})

it("should set firstName and lastName", () => {
  var user = {
    age: 23,
    location: 'silchar'
  };
  var res = utils.setName(user, 'Ermyas Fekadu');
  expect(res).toInclude({firstName: 'Ermyas'});
  expect(res).toInclude({lastName: 'Fekadu'});
  expect(res).toBeA('object');
})
