const route=require("express").Router();
const TeacherController=require("../controllers/teacher.controller");
route.get("/teacher/details",TeacherController.getTeacherDetailsById);

module.exports=route;