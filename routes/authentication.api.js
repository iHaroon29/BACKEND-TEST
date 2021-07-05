const AuthenticationController=require("../controllers/authentication.controller");
const route=require("express").Router();
route.post("/student/login",AuthenticationController.studentLogin);
route.post("/teacher/login",AuthenticationController.teacherLogin);
route.post("/admin/login",AuthenticationController.adminLogin);
route.get("/token/verify",AuthenticationController.getTokenDetails);



module.exports=route