const route=require("express").Router();
const AuthTeacherAuthVerify=require("../middlewares/authTokenVerifyForTeacher");

const ClassroomRoutes=require("./routes/classroom.api");
const CourseMaterialRoutes=require("./routes/course.material.api");
const CourseSectionRoutes=require("./routes/course.sections.api");
const CourseRoutes=require("./routes/courses.api");
const LectureAttendanceRoutes=require("./routes/lecture.attendances.api");
const LectureRoutes=require("./routes/lectures.api");
const TeacherRoutes=require("./routes/teacher.api");

route.use(AuthTeacherAuthVerify);
route.use(ClassroomRoutes);
route.use(CourseMaterialRoutes);
route.use(CourseSectionRoutes);
route.use(CourseRoutes);
route.use(LectureAttendanceRoutes);
route.use(LectureRoutes);
route.use(TeacherRoutes);

module.exports=route;