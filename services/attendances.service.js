const Attendance = require("../models/lecture.attendances.model");
const LectureService = require("../services/lectures.service");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
module.exports = {
  markStudentAsPresentUsingClassroomIdAndLectureId(
    // classroomId,
    studentId,
    lectureId,
    courseId
    // details
  ) {
    console.log(lectureId);
    return new Attendance({
      student_id: studentId,
      lecture_id: lectureId,
      course_id: courseId,
    })
      .save()
      .then((savedAttendance) => {
        console.log(savedAttendance);
        return savedAttendance;
      });
  },
  getClassroomAttendanceStatsByClassroomId(classroomId) {
    return LectureService.getAllLecturesOfClassroom(classroomId).then(
      async (allLectures) => {
        const totalLecturesInClassroom =
          await LectureService.getTotalLecturesInClassroom();
        const attendances = {};
        for (let i = 0; i < allLectures.length; i++) {
          await Attendance.find({ lecture_id: allLectures[i]._id }).then(
            (oneLectureAttendance) => {
              attendances[allLectures[i]._id] = oneLectureAttendance;
            }
          );
        }
        attendances["total_lectures_in_classroom"] = totalLecturesInClassroom;
        return attendances;
      }
    );
  },
  getAttendanceByLectureId(lectureId) {
    return Attendance.find({ lecture_id: lectureId }).then((attendance) => {
      const presentStudents = {};
      for (let i = 0; i < attendance.length; i++) {
        // presentStudents.push(attendance[i].student_id);
        if (!presentStudents[attendance[i].student_id]) {
          presentStudents[attendance[i].student_id] = [attendance[i]];
        } else {
          presentStudents[attendance[i].student_id].push(attendance[i]);
        }
      }
      return presentStudents;
    });
  },
  getAttendanceByStudentId(studentId) {
    console.log(studentId);
    return Attendance.find({ student_id: studentId });
  },
  getAttendanceByCourseId(courseId) {
    return Attendance.find({ course_id: courseId });
  },
  deleteAttendanceByStudentID(studentId) {
    console.log(studentId);
    return Attendance.findOneAndDelete({ student_id: studentId }).then(
      (deletedData) => {
        console.log("deleted");
        return deletedData;
      }
    );
  },
  updateAttendanceByStudentId(studentId, updateDetails) {
    return Attendance.findOneAndUpdate(studentId, updateDetails, {
      new: true,
    }).then((updatedDetails) => {
      return updatedDetails;
    });
  },
};
