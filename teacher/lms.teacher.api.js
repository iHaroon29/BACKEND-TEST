const route=require("express").Router();
const AuthTeacherAuthVerify=require("../middlewares/authTokenVerifyForTeacher");
const ClassroomRoutes=require("./routes/classroom.api");
const TeacherRoutes=require("./routes/teacher.api");
route.use(AuthTeacherAuthVerify);
route.use(ClassroomRoutes);
route.use(TeacherRoutes);

module.exports=route;