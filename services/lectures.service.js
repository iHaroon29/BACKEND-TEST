const LectureValidators = require("../validators/lecturesvalidtors");
const LectureDao=require("../dao/lectures.dao");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const ActivityLogger=require("../loggers/activity.logger");
const ACTIVITY_FOR_LECTURES=require("../config/LOGGERS_FOR").lecture;

module.exports = {
  async addNewLectureInClassroom(lectureDetails,userDetails={}) {
    try{
      const validLectureDetails=await LectureValidators.addNewLectureToClassroom(lectureDetails);
      const createdLecture=await LectureDao.createNewLecture(validLectureDetails);
      await ActivityLogger.logActivityCreatedNew(createdLecture,ACTIVITY_FOR_LECTURES,userDetails);
      return createdLecture;
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to create lecture",e.statusCode||503,e);
    }
  },
  async updateLectureById(lectureId, lectureDetails,userDetails={}) {
    try{
      const validLectureDetails=LectureValidators.updateLecture(lectureDetails);
      const oldLectureData=await LectureDao.getLectureById(lectureId);
      const updatedLecture= await LectureDao.updateLectureById(lectureId,validLectureDetails);
      await ActivityLogger.logActivityUpdated(oldLectureData,updatedLecture,ACTIVITY_FOR_LECTURES,userDetails);
      return  updatedLecture;
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to update lecture",e.statusCode||503,e);
    }
  },
  async  deleteLectureById(lectureId,userDetails={}) {
    try {
      const deletedLecture= await LectureDao.deleteLectureById(lectureId);
      await ActivityLogger.logActivityDeleted(deletedLecture,ACTIVITY_FOR_LECTURES,userDetails);
      return deletedLecture;
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to delete lecture",e.statusCode||503,e);
    }
  },
  async getAllLecturesOfClassroom(classroomId) {
    try {
      return await LectureDao.getLecturesByClassroomId(classroomId);
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to get all lectures of classroom",e.statusCode||503,e);
    }
  },
  async getLectureDetailsById(lectureId) {
    try {
      return await LectureDao.getLectureById(lectureId);
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to get lectures details",e.statusCode||503,e);
    }
  },

  async getAllLectures() {
    try {
      return await LectureDao.getAllLecture();
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to get lectures details",e.statusCode||503,e);
    }
  },
  async setAsAttendanceTaken(lectureId,userDetails={}){
    try {
      const oldLectureData=await LectureDao.getLectureById(lectureId);
      const updatedLectureDetails= await LectureDao.markAsAttendanceDone(lectureId);
      await ActivityLogger.logActivityUpdated(oldLectureData,updatedLectureDetails,ACTIVITY_FOR_LECTURES,userDetails);
      return updatedLectureDetails;
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to find all lectures",503,e);
    }
  },
  async getAllLecturesOfCourse(courseId){
    try {
      return await LectureDao.getLecturesByCourseId(courseId);
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to find all lectures",503,e);
    }
  },
  async getAllLecturesOfTeachers(teacherId){
    try {
      return await LectureDao.getLecturesByTeacherId(teacherId);
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to find all lectures",503,e);
    }
  },
  async setLectureAsDone(lectureId){
    try {
      const oldLectureData=await LectureDao.getLectureById(lectureId);
      const updatedLectureDetails= await LectureDao.markLectureAsCompleted(lectureId);
      await ActivityLogger.logActivityUpdated(oldLectureData,updatedLectureDetails,ACTIVITY_FOR_LECTURES,userDetails);
      return updatedLectureDetails;
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to find all lectures",503,e);
    }
  },
  async setLectureAsOngoing(lectureId){
    try {
      const oldLectureData=await LectureDao.getLectureById(lectureId);
      const updatedLectureDetails= await LectureDao.markLectureAsOngoing(lectureId);
      await ActivityLogger.logActivityUpdated(oldLectureData,updatedLectureDetails,ACTIVITY_FOR_LECTURES,userDetails);
      return updatedLectureDetails;
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to find all lectures",503,e);
    }
  }
};
