const {SHA256} = require('crypto-js')

const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

//
// let data = {
//   id: 'hello'
// }
//
// let hashed = JWT.sign(data, 'somesecret')
//
// console.log(hashed)
// console.log(JWT.verify(hashed, 'somesecret'))

// var password = '123abc!', hashed;
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//      hashed = hash;
//     console.log(hash)
//     bcrypt.compare(password, hashed+'.', (err, res) =>{
//       console.log(res)
//     })
//   })
// })
