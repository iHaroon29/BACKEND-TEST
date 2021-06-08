const route = require("express").Router();
const CourseController = require("../controllers/Courses");
const CourseSectionController = require("../controllers/CourseSection");
const TeachersController = require("../controllers/Teachers");
const StudentsController = require("../controllers/Students");
const AdminController = require("../controllers/admin.controller");

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
//============= ADMIN==================
route.put("/forget/password", AdminController.updatePassword);
route.delete("/admin/delete/:id", AdminController.deleteAdmin);
route.put("/admin/update/details", AdminController.updateAdminDetails);
route.post("/admin/new", AdminController.addNewAdmin);
//============= ADMIN==================
module.exports = route;
