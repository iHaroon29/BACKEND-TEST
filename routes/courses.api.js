const route = require("express").Router();
const CourseController = require("../controllers/course.controllers");
route.get("/courses/all", CourseController.getAllCourse);
route.post("/course/new", CourseController.addNewCourse);
route.get("/course/details/:courseId", CourseController.getCourseByCourseId);
route.put("/course/update/:courseId", CourseController.updateCourseById);
route.delete("/course/delete/:id", CourseController.deleteCourseById);
module.exports = route;