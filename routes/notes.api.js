const NotesController = require("../controllers/notes.controller");
const route = require("express").Router();

route.post("/note/new", NotesController.createNewNotes);

route.get("/note/all", NotesController.getAllNotes);

route.delete("/note/delete/:id", NotesController.deleteNote);

module.exports = route;
