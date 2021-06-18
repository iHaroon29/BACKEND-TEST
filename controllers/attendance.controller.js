const AttendanceService = require("../services/attendances.service");
module.exports = {
  async markStudentAsPresentUsingClassroomIdAndLectureId(req, res) {
    try {
      const attendanceDetails =
        await AttendanceService.markStudentAsPresentUsingClassroomIdAndLectureId(
          req.body.student_id,
          req.body.lecture_id,
          req.body.course_id
        );
      return res.status(202).send(attendanceDetails);
    } catch (e) {
      return res.sendStatus(400);
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
      return res.sendStatus(400);
    }
  },

  async getAttendanceByLectureId(req, res) {
    try {
      const attendance = await AttendanceService.getAttendanceByLectureId(
        req.params.lectureId
      );
      return res.status(202).send(attendance);
    } catch (e) {
      return res.sendStatus(400);
    }
  },

  async getAttendanceByStudentId(req, res) {
    try {
      const attendanceStatus = await AttendanceService.getAttendanceByStudentId(
        req.params.studentId
      );
      return res.status(202).send(attendanceStatus);
    } catch (e) {
      return res.sendStatus(400);
    }
  },

  async getAttendanceByCourseId(req, res) {
    try {
      const attendanceStatus = await AttendanceService.getAttendanceByCourseId(
        req.params.courseId
      );
      return res.status(202).send(attendanceStatus);
    } catch (e) {
      return res.sendStatus(400);
    }
  },

  async deleteAttendanceByStudentID(req, res) {
    try {
      const deletedAttendance =
        await AttendanceService.deleteAttendanceByStudentID(
          req.params.studentId
        );
      return res.status(202).send(deletedAttendance);
    } catch (e) {
      return res.sendStatus(400);
    }
  },

  async updateAttendanceByStudentId(req, res) {
    try {
      const updatedAttendance =
        await AttendanceService.updateAttendanceByStudentId(
          req.params.studentId,
          req.body
        );
      return res.status(202).send(updatedAttendance);
    } catch (e) {
      return res.sendStatus(400);
    }
  },
};
