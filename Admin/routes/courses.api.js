const route = require("express").Router();
const CourseController = require("../controllers/Courses");
route.get("/course/all", CourseController.getAllCourse);
route.post("/course/new", CourseController.addNewCourse);
route.put("/course/all", CourseController.updateCourseById);
route.delete("/course/:id", CourseController.deleteCourseById);
module.exports = route;