const StudentsController = require("../controllers/students.controller");
const route = require("express").Router();
route.post("/students/new", StudentsController.addNewStudent);

route.get(
  "/students/courses",
  StudentsController.getAllStudentsAndTheirCourseDetails
);

route.get("/students/all", StudentsController.getAllStudents);

route.put(
  "/students/courses",
  StudentsController.updateStudentCourseDetailsByStudentId
);

route.put(
  "/students/update/:id",
  StudentsController.updateStudentPersonalDetailsById
);

module.exports = route;
