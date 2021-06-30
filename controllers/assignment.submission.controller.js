const AssignmentSubmissionService = require("../services/assignment.submission.services");
module.exports = {
  async assignmentSubmit(req, res) {
    try {
      const assignment = await AssignmentSubmissionService.assignmentSubmit(
        req.body
      );
      return res.status(202).send(assignment);
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async getAllSubmittedAssignmentsOfClass(req, res) {
    try {
      const assignments =
        await AssignmentSubmissionService.getAllSubmittedAssignmentsOfClass();
      return res.status(202).send(assignments);
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async getAssignmentOfACourse(req, res) {
    try {
      const assignments =
        await AssignmentSubmissionService.getAssignmentOfACourse(req.params.id);
      return res.status(202).send(assignments);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
