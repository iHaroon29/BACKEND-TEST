const AssignmentServices = require("../../services/assignment.service");

module.exports = {
  async getAssignmentById(req, res) {
    try {
      const assignmentDetails = await AssignmentServices.getAssignmentById(
        req.params.id
      );
      return res.status(202).send(assignmentDetails);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  async getAssignmentOfACourse(req, res) {
    try {
      const Assignment = await AssignmentServices.getAssignmentOfACourse(
        req.params.id
      );
      return res.status(202).send(Assignment);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async getAllAssignmentOfAClassroom(req, res) {
    try {
      const Assignment = await AssignmentServices.getAllAssignmentOfAClassroom(
        req.params.id
      );
      return res.status(202).send(Assignment);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
