const route = require("express").Router();
const LectureController = require("../controllers/lectures.controller");
route.get(
  "/classroom/:classroomId/lecture/all",
  LectureController.getAllLecturesOfClassroom
);
route.get(
  "/classroom/:classroomId/lecture/:lectureId",
  LectureController.getLectureDetails
);
route.post(
  "/classroom/:classroomId/lecture/new",
  LectureController.addNewLecture
);
route.put(
  "/classroom/:classroomId/lecture/:lectureId",
  LectureController.updateLecture
);
route.delete(
  "/classroom/:classroomId/lecture/:lectureId",
  LectureController.deleteLecture
);
route.get("/lecture/all", LectureController.getAllLectures);
module.exports = route;
