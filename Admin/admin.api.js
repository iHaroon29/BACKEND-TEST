const route = require("express").Router();
const AdminUserRoutes = require("../routes/admin.users.api");
const ClassroomRoutes = require("../routes/classrooms.api");
const CourseSectionRoutes = require("../routes/course.sections.api");
const CoursesRoutes = require("../routes/courses.api");
const LectureRoutes = require("../routes/lectures.api");
const StudentsRoutes = require("../routes/students.api");
const TeacherRoutes = require("../routes/teachers.api");
const TeacherTrainingRoutes = require("../routes/teachers.training.api");
const AttendanceRoutes = require("../routes/attendance.api");
const DashboardController = require("../controllers/dashboard.controller");
const QuizRoutes = require("../routes/quiz.api");
const ClassroomCourseRoutes = require("../routes/classroom.course.api");
const StudentCourseRoutes = require("../routes/student.courses.api");
const MeetLinkRoute = require("../routes/meetLinks.api");
const AdminAuthTokenVerfication=require("../middlewares/authTokenVerifyForAdmin");
// route.use(AdminAuthTokenVerfication);

route.use(require("../routes/test.api"));
route.use(require("../routes/authentication.api"));
route.use(MeetLinkRoute);

// ============Student Course Routes================
route.use(StudentCourseRoutes);
// ============Student Course Routes================


// ============ Classroom Course ================
route.use(ClassroomCourseRoutes);
// ============ Classroom Course ================


// ============ Teachers ================
route.use(TeacherRoutes);


// ============ QUIZ ================
route.use(QuizRoutes);
// ============ QUIZ ================


// ============ Students ================
route.use(StudentsRoutes);
// ============ Students ================


//============= COURSES==================
route.use(CoursesRoutes);
//============= COURSES==================

//============= COURSE SECTION==================
route.use(CourseSectionRoutes);
//============= COURSE SECTION==================


//============= ADMIN==================
route.use(AdminUserRoutes);
//============= ADMIN==================


//==================== CLASSROOM================
route.use(ClassroomRoutes);
//==================== CLASSROOM================


//======================= LECTURE=====================
route.use(LectureRoutes);
//======================= LECTURE====================


//======================= TEACHER TRAINING=====================
route.use(TeacherTrainingRoutes);
//======================= TEACHER TRAINING====================


//=======================DASHBOARD====================
route.get("/dashboard", DashboardController.getDashboardData);
//====================================================


//======================ATTENDANCE=========================
route.use(AttendanceRoutes);
//======================ATTENDANCE=========================

module.exports = route;
