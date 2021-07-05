const route = require("express").Router();
const CourseController = require("../controllers/course.controllers");
const TeacherCourseController = require("../controllers/teacher.courses.controller");
route.get("/courses/all", CourseController.getAllCourse);
route.post("/course/new", CourseController.addNewCourse);
route.get("/course/details/:courseId", CourseController.getCourseByCourseId);
route.put("/course/update/:courseId", CourseController.updateCourseById);
route.delete("/course/delete/:id", CourseController.deleteCourseById);
route.put(
  "/course/:courseId/add/:teacherId",
  TeacherCourseController.addTeacherToCourse
);
route.delete(
  "/course/:courseId/delete/:teacherId",
  TeacherCourseController.removeTeacherFromCourse
);
module.exports = route;
