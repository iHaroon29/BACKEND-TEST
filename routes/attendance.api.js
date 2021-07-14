const AttendanceController = require("../controllers/attendance.controller");
const route = require("express").Router();

route.post(
  "/attendance/new",
  AttendanceController.markStudentAsPresentUsingClassroomIdAndLectureId
);
route.put(
  "/attendance/update/:attendanceId",
  AttendanceController.markStudentAsPresentUsingClassroomIdAndLectureId
);

route.get(
  "/attendance/classroom/:classroomId",
  AttendanceController.getClassroomAttendanceStatsByClassroomId
);

route.get(
  "/attendances/all",
  AttendanceController.allLectureAttendances
);

route.get(
  "/attendance/all/lecture/:lectureId",
  AttendanceController.getAttendanceByLectureId
);

route.get(
  "/attendance/all/student/:studentId",
  AttendanceController.getAttendanceByStudentId
);

// route.get(
//   "/attendance/all/course/:courseId",
//   AttendanceController.getAttendanceByCourseId
// );

route.get(
  "/attendance/details/:attendanceId",
  AttendanceController.attendanceDetails
);

module.exports = route;
