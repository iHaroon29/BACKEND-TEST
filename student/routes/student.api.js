const route=require("express").Router();
const StudentController=require("../controllers/student.controller");
const CourseController=require("../controllers/course.controller");
const AssignmentController = require("../controllers/assignment.controller");
const ClassroomController = require("../controllers/classroom.controller");

route.get("/student/details/:id",StudentController.getStudentPersonalDetailById);
route.put("/student/update/:id",StudentController.updateStudentPersonalDetailsById);
route.get("/courses/all", CourseController.getAllCourse);
route.get("/course/details/:courseId", CourseController.getCourseByCourseId);
route.get("/assignment/:id", AssignmentController.getAssignmentById);
route.get("/assignment/course/:id", AssignmentController.getAssignmentOfACourse);
route.get("/assignment/classroom/:id", AssignmentController.getAllAssignmentOfAClassroom);
route.get("/classroom/details/:classroomId",ClassroomController.getClassroomByClassroomId);
route.post("/forgot/password/", StudentController.forgetPasswordOfStudentByStudentId);
route.post("/update/password/:token", StudentController.updatePasswordOfStudentByStudentId);

module.exports=route;