const ClassroomController = require("../controllers/classroom.controller");
const route = require("express").Router();

route.get("/classrooms/all", ClassroomController.getAllClassroom);
route.post("/classroom/new", ClassroomController.createNewClassroom);
route.delete("/classroom/:classroomId",ClassroomController.deleteClassroomWithGivenId);
route.get("/classroom/details/:classroomId",ClassroomController.getClassroomByClassroomId);
route.post("/classroom/:classroomId/demo/teacher/new",ClassroomController.teacherForDemoClass);
route.put("/classroom/update/:classroomId",ClassroomController.updateClassroomDetails);

module.exports = route;