const AttendanceController = require("../controllers/attendance.controller");
const route = require("express").Router();

route.post(
  "/attendance/new",
  AttendanceController.markStudentAsPresentUsingClassroomIdAndLectureId
);

route.get(
  "/attendance/classroom/:classroomId",
  AttendanceController.getClassroomAttendanceStatsByClassroomId
);

route.get(
  "/attendance/all",
  AttendanceController.getClassroomAttendanceStatsByClassroomId
);

route.get(
  "/attendance/lecture/:lectureId",
  AttendanceController.getAttendanceByLectureId
);

route.get(
  "/attendance/student/:studentId",
  AttendanceController.getAttendanceByStudentId
);

route.get(
  "/attendance/course/:courseId",
  AttendanceController.getAttendanceByCourseId
);

route.delete(
  "/attendance/delete/:studentId",
  AttendanceController.deleteAttendanceByStudentID
);

route.put(
  "/attendance/update/:studentId",
  AttendanceController.updateAttendanceByStudentId
);

module.exports = route;
