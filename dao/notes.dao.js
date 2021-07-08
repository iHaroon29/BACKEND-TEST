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
                reject(DAOError("unable to create assignment", 503, error));
              });
          });
    },

    deleteNote(){

    },

    getAllNotes(){
        return new Promise((resolve, reject) => {
            Note.find()
              .then((allNotes) => {
                resolve(allNotes);
              })
              .catch((error) => {
                reject(DAOError("unable to get all assignments", 503, error));
              });
          });
    }
    
}