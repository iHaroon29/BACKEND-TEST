const StudentCourseController=require("../controllers/student.courses.controller");
const route=require("express").Router();
route.post("/student/:studentId/add/course/:courseId",StudentCourseController.addCourseToStudentClassroom);
route.delete("/student/:studentId/delete/course/:courseId",StudentCourseController.removeCourseFromStudentClassroom);
route.get("/student/course/all",StudentCourseController.getAllStudentWithTheirCourseDetails);
module.exports=route;