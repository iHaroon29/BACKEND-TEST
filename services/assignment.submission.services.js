const AssignmentSubmissionDao = require("../dao/assignment.submission.dao");
const AssignmentSubmissionValidator = require("../validators/assignment.submission.validators");
const ActivityLogger = require("../loggers/activity.logger");
const LOG_ASSIGNMENT_SUBMISSION = require("../config/LOGGERS_FOR").assignment_submission;
const ServiceErrorMessage = require("../errors/serviceErrorMessage").getRejectResponse;

module.exports = {
  async assignmentSubmit(assignmentDetails,userDetails={}) {
    try{
      const validAssignmentDetails=await AssignmentSubmissionValidator.newSubmittedAssignment(assignmentDetails);
      const newAssignmentSubmission=await AssignmentSubmissionDao.createNewAssignmentSubmission(validAssignmentDetails);
      await ActivityLogger.logActivityCreatedNew(newAssignmentSubmission,LOG_ASSIGNMENT_SUBMISSION,userDetails).catch();
      return newAssignmentSubmission;
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to create new assignment submission",503,e);
    }
  },

  async getAllSubmittedAssignmentsOfClass(classroomId) {
    try{
     return await AssignmentSubmissionDao.getAllSubmittedAssignmentsOfClass(classroomId);
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to get assignment submission classroom",503,e);
    }
  },

  async getAssignmentOfACourse(courseId) {
    try{
      return await AssignmentSubmissionDao.getSubmittedAssignmentOfACourse(courseId);
    }catch (e) {
      throw ServiceErrorMessage(e.message|| "unable to get assignment submission of course",503,e);
    }
  },
};
