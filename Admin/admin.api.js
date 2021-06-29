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
const QuizRoutes=require("../routes/quiz.api");
const ClassroomCourseRoutes=require("../routes/classroom.course.api");
const StudentCourseRoutes = require("../routes/student.courses.api")


// ============Student Course Routes================
route.use(StudentCourseRoutes);

// ============ Classroom Course ================
route.use(ClassroomCourseRoutes);


// ============ Teachers ================
route.use(TeacherRoutes);

// ============ QUIZ ================
route.use(QuizRoutes);
// ======================================

// ============ Students ================
route.use(StudentsRoutes);
// ======================================

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

// const Classroom=require("../../models/mongodb/classrooms");
//
// route.get("/test",(req,res)=>{
//     const studentID=1;
//     const dN={};
//     dN["enrolled_students."+studentID]={$exists:true};
//     console.log(dN);
//     Classroom.find(dN)
//         .then(data=>{
//             return res.status(200).send(data);
//         })
// });

module.exports = route;
