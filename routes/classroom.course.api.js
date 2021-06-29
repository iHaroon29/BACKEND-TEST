const ClassroomCourseController=require("../controllers/classroom.course.controllers");
const route=require("express").Router();
route.post("/classroom/add/course",ClassroomCourseController.addNewCourseToClassroom);
route.delete("/classroom/remove/course",ClassroomCourseController.deleteCourseFromClassroom);

module.exports=route;