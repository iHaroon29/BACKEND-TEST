const Attendance = require("../models/lecture.attendances.model");
const LectureService = require("../services/lectures.service");
const LectureAttendanceDao=require("../dao/lecture.attedance.dao");
const ActivityLogger=require("../loggers/activity.logger");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const LOG_FOR_LECTURE_ATTENDANCE=require("../config/LOGGERS_FOR").lecture_attendance;
const LectureAttendanceValidator=require("../validators/lecture.attendance.validators");

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
module.exports = {
  async markStudentAsPresentUsingClassroomIdAndLectureId(lectureAttendanceDetails,userDetails={}) {
    try{
      const validData=await LectureAttendanceValidator.addNewAttendance(lectureAttendanceDetails);
      const addedLectureAttendance=await LectureAttendanceDao.markStudentAsPresentUsingLectureId(validData);
      await ActivityLogger.logActivityCreatedNew(addedLectureAttendance,LOG_FOR_LECTURE_ATTENDANCE,userDetails).catch();
      return addedLectureAttendance;
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to mark attendance",503,e);
    }
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
        return allLectures;
      }
    );
  },
  async getAttendanceByLectureId(lectureId) {
    try{
      return await LectureAttendanceDao.getLectureAttendanceByLectureId(lectureId);
    }catch (e) {
      throw ServiceErrorMessage("unable to get attendance for the specified lecture id",503,err);
    }
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
