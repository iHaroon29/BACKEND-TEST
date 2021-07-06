const route=require("express").Router();
const ClassroomController=require("../controllers/classroom.controller");
const AssignmentController=require("../controllers/assignment.controller");

route.get("/classroom/all",ClassroomController.getClassroomsOfStudents);
route.get("/assignments/classroom/all",AssignmentController.getAllAssignmentOfAClassroom);
route.get("/assignments/course/:id/all",AssignmentController.getAssignmentOfACourse);

module.exports=route;