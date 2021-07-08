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
const QuizQuestionRoutes = require("../routes/quiz.question.api");
const ClassroomCourseRoutes = require("../routes/classroom.course.api");
const StudentCourseRoutes = require("../routes/student.courses.api");
const MeetLinkRoute = require("../routes/meetLinks.api");
const AdminAuthTokenVerification=require("../middlewares/authTokenVerifyForAdmin");
const TrainerRoutes=require("../routes/trainers.api");
const AuthenticationRoutes=require("../routes/authentication.api");
const TrainingRoutes=require("../routes/training.api");
const TeacherCourseRoutes=require("../routes/teacher.coures.api");
const CourseMaterialRoutes=require("../routes/course.material.api");
// route.use(AdminAuthTokenVerification);

// ============Testing Routes================
route.use(require("../routes/test.api"));
// ============Testing Routes================

// ============Quiz Question Routes================
route.use(QuizQuestionRoutes);
// ============Quiz Question Routes================


// ============Course Material Routes================
route.use(CourseMaterialRoutes);
// ============Course Material Routes================


// ============Training Routes================
route.use(TrainingRoutes);
// ============Training Routes================


// ============Trainer Routes================
route.use(TrainerRoutes);
// ============Trainer Routes================


// ============Authentication Routes================
route.use(AuthenticationRoutes);
// ============Authentication Routes================


// ============Meet Link Routes================
route.use(MeetLinkRoute);
// ============Meet Link Routes================


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




//======================Teacher Course Routes=========================
route.use(TeacherCourseRoutes);
//======================Teacher Course Routes=========================

module.exports = route;
