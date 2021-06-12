const StudentsController = require("../controllers/students.controller");
const route = require("express").Router();
route.post("/students/new", StudentsController.addNewStudent);
route.get("/students/studentCourses",StudentsController.getAllStudentsAndTheirCourseDetails);
route.put("/students/studentCourses",StudentsController.updateStudentCourseDetailsByStudentId);

module.exports = route;