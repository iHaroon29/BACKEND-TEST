const route=require("express").Router();
const CourseController=require("../controllers/courses.controller");

route.get("/classroom/:classroomId/courses/all/",CourseController.getAllCourseByClassroomId);
route.get("/teacher/:teacherId/courses/all/",CourseController.getCourseDetailsByTeacherId);
route.get("/course/:courseId/details/",CourseController.getCourseDetailsByCourseId);

module.exports=route;