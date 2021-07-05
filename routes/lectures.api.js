const route = require("express").Router();
const LectureController = require("../controllers/lectures.controller");
route.get(
  "/classroom/:classroomId/lectures/all",
  LectureController.getAllLecturesOfClassroom
);
route.get(
  "/classroom/:classroomId/lecture/details/:lectureId",
  LectureController.getLectureDetails
);
route.post(
  "/classroom/:classroomId/lecture/new",
  LectureController.addNewLecture
);
route.put(
  "/classroom/:classroomId/lecture/update/:lectureId",
  LectureController.updateLecture
);
route.delete(
  "/classroom/:classroomId/lecture/delete/:lectureId",
  LectureController.deleteLecture
);
route.get("/lectures/all", LectureController.getAllLectures);
module.exports = route;
