const route=require("express").Router();
const StudentController=require("./student.controller");

route.use(require("../routes/students.api"));
route.get("/classroom/all",StudentController.getAllClass);
route.get("/assignments/classroom/all",StudentController.getAllAssignmentUsingClassroomId);
route.get("/assignments/course/:id/all",StudentController.getAssignmentOfACourse);
/*
route.get("/assignments/submission/:assignmentId",StudentController.getAssignmentOfACourse);
route.get("/classroom/notes/get/all",StudentController.getAssignmentOfACourse);
route.get("/course/notes/get/all",StudentController.getAssignmentOfACourse);
route.get("/course/lectures/all");
route.get("/classroom/lectures/all");
route.get("/classroom/attendance/all");
 */
module.exports=route;