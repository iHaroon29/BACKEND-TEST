const Note = require("../models/notes.model");
const noteValidator = require("../validators/note.validators");

module.exports = {
  async createNewNotes(noteDetails) {
    return noteValidator.newNote(noteDetails).then(async (validData) => {
      return new Note(validData).save();
    });
  },

  async deleteNote(noteId) {
    let note = await Note.findOne({ _id: noteId });
    if (!note) throw "Given Id not found";

    const deletedNote = await Note.findByIdAndDelete(noteId);
    return deletedNote;
  },

  getAllNotes() {
    return Note.find().then((notes) => {
      return notes;
    });
  },
};
