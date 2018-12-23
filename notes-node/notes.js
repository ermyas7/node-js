const fs = require('fs')

var fetchNote = () => {
  var noteString = fs.readFileSync('notes.json');
  return JSON.parse(noteString);
}

var saveNote = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes))
}

//add new note
var addNote = (title, body) => {
  var note = {title, body};

  try{
    var notes = fetchNote();
    var filteredNote = notes.filter( (note) => note.title === title)
    if(filteredNote.length === 0){
      //add new note to notes array
      notes.push(note);
      saveNote(notes);
      return note;
    }
  }
  catch(err){
    var notes = [];
    notes.push(note);
    saveNote(notes);
    return note;
  }
}
//remove specific note
const removeNote = (title) => {
  try{
    var notes = fetchNote();
    var filteredNote = notes.filter( (note) => note.title !== title);
    saveNote(filteredNote);
    if(filteredNote.length !== notes.length){
      return title;
    }
  }
  catch(err){}
}

//read a specific //
var getNote = (title) => {
  try{
    var notes = fetchNote();
    var filteredNote = notes.filter( (note) => note.title === title);
    if(filteredNote.length !== 0){
      return filteredNote[0]
    }
  }
  catch(err){}
}

var getAllNote = () => {
  //return all notes
  return fetchNote();
}

var logNote = (note) => {
  console.log('---')
  console.log(`title: ${note.title}`)
  console.log(`body: ${note.body}`)
}







module.exports = {
  addNote,
  getAllNote,
  getNote,
  removeNote,
  logNote
}
