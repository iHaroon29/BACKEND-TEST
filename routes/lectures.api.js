const route = require("express").Router();
const LectureController = require("../controllers/lectures.controller");
route.get(
  "/classroom/:classroomId/lectures/all",
  LectureController.getAllLecturesOfClassroom
);
route.get(
  "/lecture/details/:lectureId",
  LectureController.getLectureDetails
);
route.post(
  "/lecture/new",
  LectureController.addNewLecture
);
route.put(
  "/lecture/update/:lectureId",
  LectureController.updateLecture
);
route.put(
  "/lecture/completed/:lectureId",
  LectureController.lectureCompleted
);
route.put(
  "/lecture/ongoing/:lectureId",
  LectureController.lectureOngoing
);
route.put(
  "/lecture/:lectureId/attendance/done",
  LectureController.attendanceDone
);
route.delete(
  "/lecture/delete/:lectureId",
  LectureController.deleteLecture
);
route.get("/lectures/all", LectureController.getAllLectures);
route.get("/course/:courseId/lectures/all", LectureController.lecturesOfCourse);
route.get("/teacher/:teacherId/lectures/all", LectureController.lecturesOfTeacher);
module.exports = route;
