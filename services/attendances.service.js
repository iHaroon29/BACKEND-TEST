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
  async getClassroomAttendanceStatsByClassroomId(classroomId) {
    try{
      return await LectureAttendanceDao.getAllLectureAttendanceByClassroomId(classroomId);
    }catch (e) {
      throw ServiceErrorMessage("unable to attendances of classroom");
    }
  },
  async getAttendanceByLectureId(lectureId) {
    try{
      return await LectureAttendanceDao.getLectureAttendanceByLectureId(lectureId);
    }catch (e) {
      throw ServiceErrorMessage("unable to get attendance for the specified lecture",503,err);
    }
  },
  async getAttendanceByStudentId(studentId) {
    try{
      return await LectureAttendanceDao.getAllLectureAttendanceByStudentId(studentId);
    }catch (e) {
      throw ServiceErrorMessage("unable to get attendance for the specified student",503,err);
    }
  },
  async getAttendanceByAttendanceId(attendanceId) {
    try{
      return await LectureAttendanceDao.getLectureAttendanceDetailsById(attendanceId);
    }catch (e) {
      throw ServiceErrorMessage("unable to get attendance for the specified student",503,err);
    }
  },
  async getAttendanceByCourseId(courseId) {
    try{
      return await LectureAttendanceDao.getAllLectureAttendanceByCourseId(courseId);
    }catch (e) {
      throw ServiceErrorMessage("unable to get attendance for the specified course",503,e);
    }
  },
  async getAllAttendances() {
    try{
      return await LectureAttendanceDao.getAllLectureAttendance();
    }catch (e) {
      throw ServiceErrorMessage("unable to get all attendances",503,e);
    }
  },
};
