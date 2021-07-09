const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const Note = require("../models/notes.model");


module.exports = {
    createNewNotes(){
        return new Promise((resolve, reject) => {
            new Note(notesDetails)
              .save()
              .then((savedDetails) => {
                resolve(savedDetails);
              })
              .catch((error) => {
                reject(DAOError("unable to create note", 503, error));
              });
          });
    },

    deleteNote(noteId){
        return new Promise((resolve, reject)=>{
          Note.findByIdAndDelete(noteId).then((deletedNote)=>{
            if(!deletedNote){
              reject("note can not be deleted", 400)
            }
            resolve(deletedNote)
          }).catch((error)=>{
            reject(DAOError("unable to delete note", 503, error));
          })
        })
    },

    getAllNotes(){
        return new Promise((resolve, reject) => {
            Note.find()
              .then((allNotes) => {
                resolve(allNotes);
              })
              .catch((error) => {
                reject(DAOError("unable to get all notes", 503, error));
              });
          });
    },

    updateNotesById(noteId, newNote){
      return new Promise((resolve, reject)=>{
        Note.findByIdAndUpdate(noteId, newNote, {new:true}).then((noteDetails)=>{
            if(!noteDetails){
                reject("unable to update", 400)
            }
            resolve(noteDetails)
        }).catch((error)=>{
            reject(DaoError("unable to update note",503,error))
        })
    })
    },

    getNoteById(noteId){
      return new Promise((resolve, reject)=>{
        Note.findById(noteId).then((noteDetails)=>{
            if(!noteDetails){
                reject("unable to find", 400)
            }
            resolve(noteDetails)
        }).catch((error)=>{
            reject(DaoError("unable to find note",503,error))
        })
    })
    }
    

}