const NoteService = require("../services/notes.services");
module.exports = {
  async createNewNotes(req, res) {
    try {
      const noteDetails = await NoteService.createNewNotes(req.body);
      return res.status(202).send(noteDetails);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async getAllNotes(req, res) {
    try {
      const allNotes = await NoteService.getAllNotes();
      return res.status(202).send(allNotes);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async deleteNote(req, res) {
    try {
      const deletedNote = await NoteService.deleteNote(req.params.id);
      return res.status(202).send(deletedNote);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
