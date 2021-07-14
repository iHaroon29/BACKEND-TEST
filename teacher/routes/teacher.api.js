const route=require("express").Router();
const TeacherController=require("../controllers/teacher.controller");
route.get("/teacher/details",TeacherController.getTeacherDetailsById);
route.post("/teacher/forgot/password",TeacherController.forgetPasswordOfTeacherByTeacherId);
route.put("/teacher/update/password/:token",TeacherController.updatePasswordOfTeacherByTeacherId);

module.exports=route;