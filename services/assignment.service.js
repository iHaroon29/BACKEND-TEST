const assignmentValidator = require("../validators/assignment.validators");
const AssignmentDao=require("../dao/assignment.dao");
const ActivityLogger=require("../loggers/activity.logger");
const LOG_ASSIGNMENT=require("../config/LOGGERS_FOR").assignment;
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;


module.exports = {
  async createAssignment(assignmentDetails,userDetails={}) {
    try{
      const validAssignmentDetails=await assignmentValidator.newAssignment(assignmentDetails);
      const newAssignment=await AssignmentDao.createAssignment(validAssignmentDetails);
      await ActivityLogger.logActivityCreatedNew(newAssignment,LOG_ASSIGNMENT,userDetails).catch();
      return newAssignment;
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to create new assignment",e.statusCode||503,e)
    }
  },

  async updateAssignment(assignmentId, updateDetails,userDetails={}) {
    try{
      const validAssignmentDetails=await assignmentValidator.updateAssignmentDetails(updateDetails);
      const oldAssignment=await AssignmentDao.getAssignmentById(assignmentId);
      if(!oldAssignment){
        throw new Error("no assignment found to update");
      }
      const newAssignment=await AssignmentDao.updateAssignmentById(assignmentId,validAssignmentDetails);
      await ActivityLogger.logActivityUpdated(oldAssignment,newAssignment,LOG_ASSIGNMENT,userDetails).catch();
      return newAssignment;
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to update assignment",e.statusCode||503,e)
    }
  },
  async deleteAssignmentById(assignmentId,userDetails) {
    try{
      const newAssignment=await AssignmentDao.deleteAssignmentById(assignmentId);
      if(!newAssignment){
        throw new Error("no assignment found to update");
      }
      await ActivityLogger.logActivityDeleted(newAssignment,LOG_ASSIGNMENT,userDetails).catch();
      return newAssignment;
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to delete assignment",e.statusCode||503,e)
    }
  },

  async getAllAssignments() {
    try{
      return await AssignmentDao.getAllAssignments();
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to find all assignments",e.statusCode||503,e)
    }
  },

  async getAssignmentById(assignmentId) {
    try{
      return await AssignmentDao.getAssignmentById(assignmentId);
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to find assignment",e.statusCode||503,e)
    }
  },

  async getAllAssignmentOfAClassroom(classroomId) {
    try{
      return await AssignmentDao.getAllAssignmentsOfAClassroom(classroomId);
    }catch (e) {
      throw ServiceErrorMessage(e.message||"unable to find assignments of classroom",e.statusCode||503,e)
    }
  },
};
