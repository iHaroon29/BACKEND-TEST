const route=require("express").Router();
const CourseController=require("../controllers/Courses");
const CourseSectionController=require("../controllers/course.section.controller");
const AdminController=require("../controllers/admin.controller");
const ClassroomController=require("../controllers/classroom.controller");
const LectureController=require("../controllers/lectures.controller");
const TeacherTrainingRoutes=require("./teachers.training.api");

//============= COURSES==================
route.get("/course/all",CourseController.getAllCourse);
route.post("/course/new",CourseController.addNewCourse);
route.put("/course/all",CourseController.updateCourseById);
route.delete("/course/:id",CourseController.deleteCourseById);
//============= COURSES==================

//============= COURSE SECTION==================
route.get("/course/:courseId/section/:courseSectionId",CourseSectionController.getCourseSectionDetails);
route.get("/course/:courseId/section/all",CourseSectionController.getAllCourseSectionsOfCourse);
route.get("/course/section/all",CourseSectionController.getAllCourseSection);
route.post("/course/:courseId/section/new",CourseSectionController.addNewCourseSection);
route.put("/course/:courseId/section/:courseSectionId",CourseSectionController.updateCourseSection);
route.delete("/course/:courseId/section/:courseSectionId",CourseSectionController.deleteCourseSection);
//============= COURSE SECTION==================


//============= ADMIN==================
route.put("/forget/password",AdminController.updatePassword);
route.delete("/admin/delete/:id",AdminController.deleteAdmin);
route.put("/admin/update/details",AdminController.updateAdminDetails);
route.post("/admin/new",AdminController.addNewAdmin);
//============= ADMIN==================

//==================== CLASSROOM================
route.post("/classroom/new",ClassroomController.createNewClassroom);
route.delete("/classroom/:classroomId",ClassroomController.deleteClassroomWithGivenId);
route.get("/classroom/all",ClassroomController.getAllClassroom);
route.post("/classroom/demo/teacher/new/:classroomId",ClassroomController.teacherForDemoClass);
route.put("/classroom/update/:classroomId",ClassroomController.updateClassroomDetails);
//==================== CLASSROOM================


//======================= LECTURE=====================
route.get("/classroom/:classroomId/lecture/all",LectureController.getAllLecturesOfClassroom);
route.get("/classroom/:classroomId/lecture/:lectureId",LectureController.getLectureDetails);
route.post("/classroom/:classroomId/lecture/new",LectureController.addNewLecture);
route.put("/classroom/:classroomId/lecture/:lectureId",LectureController.updateLecture);
route.delete("/classroom/:classroomId/lecture/:lectureId",LectureController.deleteLecture);

//======================= LECTURE=====================

route.use(TeacherTrainingRoutes);





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

module.exports=route;
