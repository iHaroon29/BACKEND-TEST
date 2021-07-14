const route=require("express").Router();
const ClassroomController=require("../controllers/classroom.controller");
route.get("/classrooms/details/all",ClassroomController.getAllClassrooms);
route.get("/classrooms/:classroomId",ClassroomController.getAllClassrooms);

module.exports=route;