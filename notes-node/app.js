console.log('application running')

const fs = require('fs')
const os = require('os')
const name = os.userInfo().username
fs.appendFile('greeting.txt', `\n hello dear ${name}!`, (err) => {
    if(err){
      console.log('error happend');
    }
})
