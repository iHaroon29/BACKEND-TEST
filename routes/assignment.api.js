const AssignmentController = require("../controllers/assignment.controller");
const route = require("express").Router();

route.post("/assignment/new", AssignmentController.createAssignment);

route.get("/assignment/all", AssignmentController.getAllAssignments);

route.delete(
  "/assignment/delete/:id",
  AssignmentController.deleteAssignmentById
);

route.get("/assignment/:id", AssignmentController.getAssignmentById);

route.put("/assignment/update/:id", AssignmentController.updateAssignment);

route.get(
  "/assignment/course/:id",
  AssignmentController.getAssignmentOfACourse
);

route.get(
  "/assignment/classroom/:id",
  AssignmentController.getAllAssignmentOfAClassroom
);

module.exports = route;
