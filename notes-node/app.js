console.log('app running!')

const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes')

const argv = yargs.argv
const command = argv._[0]

console.log("yargs ", argv)

console.log('command')

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);

  if(note){
      notes.logNote(note)
  }
  else{
    console.log('title is taken!')
  }
}

else if(command === 'remove'){

  var title = notes.removeNote(argv.title)
  if(title){
    console.log(`Note with title: ${title} removed!`)
  }
  else{
    console.log(`title: ${argv.title}  is not available in the note`)
  }
}

else if(command === 'read'){
  var note = notes.getNote(argv.title);
  if(note){
    notes.logNote(note)
  }
  else{
    console.log(`note with title: ${argv.title} not available!`)
  }
}

else if(command === 'list'){
  notes.getAllNote()
}
else{
  console.log('command not recognized')
}
