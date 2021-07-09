const AttendanceService = require("../services/attendances.service");
module.exports = {
  async markStudentAsPresentUsingClassroomIdAndLectureId(req, res) {
    try {
      const lectureAttendanceDetails={
        student_id:req.body.student_id,
        lecture_id:req.body.lecture_id,
        course_id:req.body.course_id
      };
      const attendanceDetails = await AttendanceService.markStudentAsPresentUsingClassroomIdAndLectureId(lectureAttendanceDetails);
      return res.status(202).send(attendanceDetails);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },

  async getClassroomAttendanceStatsByClassroomId(req, res) {
    try {
      const attendanceStatus =
        await AttendanceService.getClassroomAttendanceStatsByClassroomId(
          req.params.classroomId
        );
      return res.status(202).send(attendanceStatus);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },

  async getAttendanceByLectureId(req, res) {
    try {
      const attendance = await AttendanceService.getAttendanceByLectureId(
        req.params.lectureId
      );
      return res.status(202).send(attendance);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },

  async getAttendanceByStudentId(req, res) {
    try {
      const attendanceStatus = await AttendanceService.getAttendanceByStudentId(
        req.params.studentId
      );
      return res.status(202).send(attendanceStatus);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },

  async getAttendanceByCourseId(req, res) {
    try {
      const attendanceStatus = await AttendanceService.getAttendanceByCourseId(
        req.params.courseId
      );
      return res.status(202).send(attendanceStatus);
    } catch (e) {

      console.log(e)
      return res.status(e.statusCode||503).send(e);
    }
  },
  async allLectureAttendances(req, res) {
    try {
      const allAttendances = await AttendanceService.getAllAttendances();
      return res.status(202).send(allAttendances);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async attendanceDetails(req, res) {
    try {
      const allAttendances = await AttendanceService.getAttendanceByAttendanceId(req.params.attendanceId);
      return res.status(202).send(allAttendances);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },

};
