const route=require("express").Router();
const StudentController=require("./student.controller");

route.get("/classroom/all",StudentController.getAllClass);
route.get("/assignments/classroom/all",StudentController.getAllAssignmentUsingClassroomId);
route.get("/assignments/course/:id/all",StudentController.getAssignmentOfACourse);

module.exports=route;