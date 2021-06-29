const AssignmentServices = require("../services/assignment.service");

module.exports = {
  async createAssignment(req, res) {
    try {
      const assignment = await AssignmentServices.createAssignment(req.body);
      return res.status(202).send(assignment);
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message || e);
    }
  },
  async getAllAssignments(req, res) {
    try {
      const allAssignments = await AssignmentServices.getAllAssignments();
      return res.status(200).send(allAssignments);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async deleteAssignmentById(req, res) {
    try {
      const deletedAssignment = await AssignmentServices.deleteAssignmentById(
        req.params.id
      );
      return res.status(202).send(deletedAssignment);
    } catch (e) {
      res.status(400).send(e);
    }
  },
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
  async updateAssignment(req, res) {
    try {
      const updatedAssignment = await AssignmentServices.updateAssignment(
        req.params.id,
        req.body
      );
      return res.status(202).send(updatedAssignment);
    } catch (e) {
      return res.status(400).send(e);
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
