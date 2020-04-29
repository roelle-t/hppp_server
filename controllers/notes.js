// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');
const User = require('../models/users');
const Note = require('../models/notes');



async function addNote(request, response){
    const note = new Note({
      username: request.body.username,
      message: request.body.message,
      time: request.body.time

    })
    try{
      const newNote = await note.save()
    }
    catch(err){
      console.log(err);
      response.status(400).json({message: err.message})
    }

  }

  async function getNotes(request, response){
    try{
        const notes = await Note.find({username: request.body.username})
        response.json(notes)
      }
      catch(err){
        console.log(err)
      }
  
  }


module.exports = {
    getNotes,
    addNote
};