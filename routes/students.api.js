const StudentsController = require("../controllers/students.controller");
const route = require("express").Router();
route.post("/student/new", StudentsController.addNewStudent);

route.get(
  "/student/all/courses/all",
  StudentsController.getAllStudentsAndTheirCourseDetails
);

route.get("/students/all", StudentsController.getAllStudents);

route.put(
  "/students/courses/update/:studentId",
  StudentsController.updateStudentCourseDetailsByStudentId
);

route.put(
  "/students/update/:id",
  StudentsController.updateStudentPersonalDetailsById
);

route.delete("/student/delete/:id", StudentsController.deleteStudentById);

module.exports = route;
