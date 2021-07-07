const TeachersController = require("../controllers/teachers.controller");
const route = require("express").Router();
const upload = require("../middlewares/checkIfUploadedFileIsExcel");

route.post("/teacher/new", TeachersController.addNewTeacher);

route.get("/teachers/all", TeachersController.getAllTeachersAndPersonalDetails);

route.delete("/teacher/delete/:id", TeachersController.deleteTeacherById);

route.get(
  "/teacher/details/:id",
  TeachersController.getTeacherPersonalDetailById
);

route.put(
  "/teacher/update/:id",
  TeachersController.updateTeacherPersonalDetailsById
);

route.post(
  "/teacher/new/file",
  upload.single("excel"),
  TeachersController.addNewTeacherUsingExcelSheet
);
module.exports = route;
