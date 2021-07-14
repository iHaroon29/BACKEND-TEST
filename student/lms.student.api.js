const route=require("express").Router();
const AuthStudentAuthVerify=require("../middlewares/authTokenVerifyForStudents");
const StudentRoutes=require("./routes/student.api");
route.use(AuthStudentAuthVerify);
route.use(StudentRoutes);

module.exports=route;