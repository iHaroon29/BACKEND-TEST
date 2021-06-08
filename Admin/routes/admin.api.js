const route = require("express").Router();
const CourseController = require("../controllers/Courses");
const CourseSectionController = require("../controllers/CourseSection");
const TeachersController = require("../controllers/Teachers");
const StudentsController = require("../controllers/Students");
const AdminController = require("../controllers/admin.controller");
const ClassroomController = require("../controllers/classroom.controller");
const LectureController = require("../controllers/lectures.controller");

// Teachers Route
route.post("/teachers/new", TeachersController.addNewTeacher);
route.get("/teachers/all", TeachersController.getAllTeachersAndPersonalDetails);
route.delete("/teachers/:id", TeachersController.deleteTeacherById);
route.get("/teachers/:id", TeachersController.getTeacherPersonalDetailById);

//Students Route
route.post("/students/new", StudentsController.addNewStudent);
route.get(
  "/students/studentCourses",
  StudentsController.getAllStudentsAndTheirCourseDetails
);

route.get("/course/all", CourseController.getAllCourse);
route.post("/course/new", CourseController.addNewCourse);
route.put("/course/all", CourseController.updateCourseById);
route.delete("/course/:id", CourseController.deleteCourseById);
route.post("/course_section/new", CourseSectionController.addNewCourseSection);

//============= COURSES==================
route.get("/course/all", CourseController.getAllCourse);
route.post("/course/new", CourseController.addNewCourse);
route.put("/course/all", CourseController.updateCourseById);
route.delete("/course/:id", CourseController.deleteCourseById);
route.post("/course_section/new", CourseSectionController.addNewCourseSection);

//============= COURSES==================

//============= ADMIN==================
route.put("/forget/password", AdminController.updatePassword);
route.delete("/admin/delete/:id", AdminController.deleteAdmin);
route.put("/admin/update/details", AdminController.updateAdminDetails);
route.post("/admin/new", AdminController.addNewAdmin);
//============= ADMIN==================

//==================== CLASSROOM================
route.post("/classroom/new", ClassroomController.createNewClassroom);
route.delete(
  "/classroom/:classroomId",
  ClassroomController.deleteClassroomWithGivenId
);
route.get("/classroom/all", ClassroomController.getAllClassroom);
route.post(
  "/classroom/demo/teacher/new/:classroomId",
  ClassroomController.teacherForDemoClass
);
route.put(
  "/classroom/update/:classroomId",
  ClassroomController.updateClassroomDetails
);
//==================== CLASSROOM================

//======================= LECTURE=====================
route.get(
  "/classroom/:classroomId/lecture/all",
  LectureController.getAllLecturesOfClassroom
);
route.get(
  "/classroom/:classroomId/lecture/:lectureId",
  LectureController.getLectureDetails
);
route.post(
  "/classroom/:classroomId/lecture/new",
  LectureController.addNewLecture
);
route.put(
  "/classroom/:classroomId/lecture/:lectureId",
  LectureController.updateLecture
);
route.delete(
  "/classroom/:classroomId/lecture/:lectureId",
  LectureController.deleteLecture
);

//======================= LECTURE=====================

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
