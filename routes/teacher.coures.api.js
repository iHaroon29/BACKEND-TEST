const route = require("express").Router();
const TeacherCourseController = require("../controllers/teacher.courses.controller");
route.put(
    "/teacher/:teacherId/course/add/:courseId/",
    TeacherCourseController.addTeacherToCourse
);
route.delete(
    "/teacher/:teacherId/course/remove/:courseId/",
    TeacherCourseController.removeTeacherFromCourse
);
module.exports = route;
