const route = require("express").Router();
const CourseController = require("../controllers/course.controllers");
route.get("/course/all", CourseController.getAllCourse);
route.post("/course/new", CourseController.addNewCourse);
route.get("/course/:courseId", CourseController.getCourseByCourseId);
route.put("/course/:courseId/update", CourseController.updateCourseById);
route.delete("/course/:id", CourseController.deleteCourseById);
module.exports = route;