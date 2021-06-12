const route = require("express").Router();
const AdminUserRoutes = require("./admin.users.api");
const ClassroomRoutes = require("./classrooms.api");
const CourseSectionRoutes = require("./course.sections.api");
const CoursesRoutes = require("./courses.api");
const LectureRoutes = require("./lectures.api");
const StudentsRoutes = require("./students.api");
const TeacherRoutes = require("./teachers.api");
const TeacherTrainingRoutes = require("./teachers.training.api");
const DashboardController = require("../controllers/dashboard.controller");

// ============ Teachers ================
route.use(TeacherRoutes);
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
