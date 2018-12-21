// var obj = {
//   name: 'Ermyas',
//   age: 22
// };
//
// var objString = JSON.stringify(obj);
//
// console.log(typeof objString)
// console.log(objString)
//
// var personString = '{"name": "Ermyas","age": 22}';
//
// var person = JSON.parse(personString);
// console.log(typeof person)
// console.log(person)

const fs = require('fs');

var orginalNote = {
  title: 'how are you',
  body: 'some body is really enjoying hitting this keyboards'
};

var orginalStringNote = JSON.stringify(orginalNote);

fs.writeFileSync("note.json", orginalStringNote);

var stringNote = fs.readFileSync("note.json");
var note = JSON.parse(stringNote);

console.log(typeof note);
console.log(note);
