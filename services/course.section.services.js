const CourseSectionValidator = require("../validators/CourseSection.validators");
const CourseSectionDao=require("../dao/course.section.dao");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const ActivityLogger=require("../loggers/activity.logger");
const LOG=require("../config/LOGGERS_FOR").course_section;

module.exports = {
  async addNewCourseSection(courseId, courseSectionDetails,userDetails={}) {
    try {
      courseSectionDetails.course_id = courseId;
      const validData=await CourseSectionValidator.addNewCourseSection(courseSectionDetails);
      const newCourseSection=await CourseSectionDao.createCourseSection(validData);
      await ActivityLogger.logActivityCreatedNew(newCourseSection,LOG,userDetails).catch();
      return  newCourseSection;
    }catch (e) {
      throw ServiceErrorMessage("unable to create new course section",503,e);
    }

  },
  async deleteCourseSection(courseSectionId,userDetails={}) {
    try {
      const newCourseSection=await CourseSectionDao.deleteCourseSectionById(courseSectionId);
      await ActivityLogger.logActivityDeleted(newCourseSection,LOG,userDetails).catch();
      return  newCourseSection;
    }catch (e) {
      throw ServiceErrorMessage("unable to update course section",503,e);
    }
  },

  async updateCourseSection(courseSectionId, courseSectionDetails,userDetails={}) {
    try {
      const oldCourseSection=await CourseSectionDao.getCourseSectionByCourseSectionId(courseSectionId);
      const validData=await CourseSectionValidator.updateCourseSection(courseSectionDetails);
      const newCourseSection=await CourseSectionDao.updateCourseSectionById(courseSectionId,validData);
      await ActivityLogger.logActivityUpdated(oldCourseSection,newCourseSection,LOG,userDetails).catch();
      return  newCourseSection;
    }catch (e) {
      throw ServiceErrorMessage("unable to update course section",503,e);
    }
  },

  async getAllCourseSectionByCourseId(courseId) {
    try{
      return await CourseSectionDao.getCourseSectionByCourseId(courseId);
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to get all course sections",503,e)
    }
  },

  async getCourseSectionDetails(courseSectionId) {
    try{
      return await CourseSectionDao.getCourseSectionByCourseSectionId(courseSectionId);
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to get all course sections",503,e)
    }
  },
  async getAllCourseSections() {
    try{
      return await CourseSectionDao.getAllCourseSections();
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to get all course sections",503,e)
    }
  },
};
