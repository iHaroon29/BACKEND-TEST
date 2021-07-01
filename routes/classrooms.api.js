const ClassroomController = require("../controllers/classroom.controller");
const route = require("express").Router();

route.post("/classroom/new", ClassroomController.createNewClassroom);
route.delete("/classroom/:classroomId",ClassroomController.deleteClassroomWithGivenId);
route.get("/classroom/:classroomId",ClassroomController.getClassroomByClassroomId);
route.get("/classroom/all", ClassroomController.getAllClassroom);
route.post("/classroom/demo/teacher/new/:classroomId",ClassroomController.teacherForDemoClass);
route.put("/classroom/update/:classroomId",ClassroomController.updateClassroomDetails);

module.exports = route;