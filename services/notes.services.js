const NotesDAO = require("../dao/notes.dao");
const NotesValidator = require("../validators/note.validators");
const ActivityLogger = require("../loggers/activity.logger");
const LOG_FOR_NOTES = require("../config/LOGGERS_FOR").notes;
const ServiceErrorMessage = require("../errors/serviceErrorMessage").getRejectResponse;

module.exports = {
  async createNewNotes(noteDetails,userDetails={}) {
    try{
      const validNotesDetails=await NotesValidator.newNote(noteDetails);
      const newNotes=await NotesDAO.createNewNotes(validNotesDetails);
      await ActivityLogger.logActivityCreatedNew(newNotes,LOG_FOR_NOTES,userDetails);
      return newNotes;
    }catch (e) {
      throw ServiceErrorMessage("unable to create new notes",503,e);
    }
  },

  async deleteNote(noteId,userDetails={}) {
    try{
      const newNotes=await NotesDAO.createNewNotes(noteId);
      await ActivityLogger.logActivityDeleted(newNotes,LOG_FOR_NOTES,userDetails);
      return newNotes;
    }catch (e) {
      throw ServiceErrorMessage("unable to delete notes",503,e);
    }
  },
  async updateNote(noteId,updateNoteDetails,userDetails={}) {
    try{
      const oldData=await NotesDAO.getNoteById(noteId);
      const newNotes=await NotesDAO.updateNotesById(noteId,updateNoteDetails);
      await ActivityLogger.logActivityUpdated(oldData,newNotes,LOG_FOR_NOTES,userDetails);
      return newNotes;
    }catch (e) {
      throw ServiceErrorMessage("unable to update notes",503,e);
    }
  },

  async getAllNotes() {
    try{
      return await NotesDAO.getAllNotes();
    }catch (e) {
      throw ServiceErrorMessage("unable to get all notes",503,e);
    }
  },
};
