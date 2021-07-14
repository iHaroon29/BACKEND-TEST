const CourseMaterialDao=require("../dao/course.material.dao");
const CourseMaterialValidator = require("../validators/course.material.validators");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const LogActivity=require("../loggers/activity.logger");
const LogFor=require("../config/LOGGERS_FOR").course_material;

module.exports = {
  async createCourseMaterial(materialDetails,userDetails={}) {
    try{
      const validCourseMaterial=await CourseMaterialValidator.newCourseMaterial(materialDetails);
      const createdCourseMaterial=await CourseMaterialDao.createCourseMaterial(validCourseMaterial);
      await LogActivity.logActivityCreatedNew(createdCourseMaterial,LogFor,userDetails);
      return createdCourseMaterial;
    }catch (err) {
      throw ServiceErrorMessage(err.message||"unable to create new course material",503,err);
    }
  },

  async deleteCourseMaterial(materialId,userDetails={}) {
    try{
      const deletedCourseMaterial=await CourseMaterialDao.deleteCourseMaterial(materialId);
      if(!deletedCourseMaterial){
        throw ServiceErrorMessage("no course material present",400);
      }
      await LogActivity.logActivityCreatedNew(deletedCourseMaterial,LogFor,userDetails);
      return deletedCourseMaterial;
    }catch (err) {
      throw ServiceErrorMessage(err.message||"unable to delete course material",503,err);
    }
  },

  async getAllCourseMaterial() {
    try{
      return await CourseMaterialDao.getAllCourseMaterial();
    }catch (err) {
      throw ServiceErrorMessage(err.message||"unable to find all course material",503,err);
    }
  },
  async updateCourseMaterial(courseMaterialId,newCourseMaterialDetails,userDetails={}) {
    try{
      const oldCourseMaterial=await CourseMaterialDao.getCourseMaterialById(courseMaterialId);
      if(!oldCourseMaterial){
        throw ServiceErrorMessage("no course material found with specified id",400);
      }
      const updatedCourseMaterial=await CourseMaterialDao.updateCourseMaterialByCourseMaterialId(courseMaterialId,newCourseMaterialDetails);
      await LogActivity.logActivityUpdated(oldCourseMaterial,updatedCourseMaterial,LogFor,userDetails)
      return updatedCourseMaterial;
    }catch (err) {
      throw ServiceErrorMessage(err.message||"unable to find all course material",503,err);
    }
  },
  async getCourseMaterialByCourseMaterialId(courseMaterialId) {
    try{
      const oldCourseMaterial=await CourseMaterialDao.getCourseMaterialById(courseMaterialId);
      if(!oldCourseMaterial){
        throw ServiceErrorMessage("no course material found",400);
      }
      return oldCourseMaterial;
    }catch (err) {
      throw ServiceErrorMessage(err.message||"unable to find all course material",503,err);
    }
  },
  async getCourseMaterialByCourseSectionId(courseSectionId) {
    try{
      const courseMaterials=await CourseMaterialDao.getAllCourseMaterialsByCourseSectionId(courseSectionId);
      if(!courseMaterials){
        throw ServiceErrorMessage("no course material found",400);
      }
      return courseMaterials;
    }catch (err) {
      throw ServiceErrorMessage(err.message||"unable to find all course material",503,err);
    }
  },
};
