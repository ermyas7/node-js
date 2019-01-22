const {SHA256} = require('crypto-js')

const JWT = require('jsonwebtoken')

// let message = 'hello to hash'
// let hash = SHA256(message).toString();
// console.log(`Massage: ${message}`)
// console.log(`Hash: ${hash}`)

// let data = {
//   id: 10
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data + 'somesecret'))
// }
//
// console.log(token.hash.toString())
// token.data.id = 11
// console.log(token.hash.toString())


let data = {
  id: 'hello'
}

let hashed = JWT.sign(data, 'somesecret')

console.log(hashed)
console.log(JWT.verify(hashed, 'somesecret'))
