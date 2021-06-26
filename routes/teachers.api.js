const TeachersController = require("../controllers/teachers.controller");
const route = require("express").Router();

route.post("/teachers/new", TeachersController.addNewTeacher);

route.get("/teachers/all", TeachersController.getAllTeachersAndPersonalDetails);

route.delete("/teachers/:id", TeachersController.deleteTeacherById);

route.get("/teachers/:id", TeachersController.getTeacherPersonalDetailById);

route.put(
  "/teachers/update/:id",
  TeachersController.updateTeacherPersonalDetailsById
);
module.exports = route;
