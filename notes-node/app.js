const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes')

const title = {
    describe: 'title of the note',
    demand: true,
    alias: 't'
}

const body = {
  describe: 'body of the note',
  demand: true,
  alias: 'b'
}

//commands and there description
const argv = yargs
.command('read', 'read specific note note', {
  title
})
.command('add', 'add new note', {
  title,
  body
})
.command('remove', 'delete a note', {
  title
})
.command('list', 'list add notes')
.help()
.argv
const command = argv._[0]

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

  var noteTitle = notes.removeNote(argv.title)
  if(noteTitle){
    console.log(`Note with note: ${noteTitle} removed!`)
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
  var allNotes = notes.getAllNote()
  console.log(`listing: ${allNotes.length} notes`);
  allNotes.forEach( (note) => notes.logNote(note));
}
else{
  console.log('command not recognized')
}
