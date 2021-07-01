const AssignmentSubmission = require("../models/assignment.submissions.model");
const Assignment = require("../models/assignments.model");
const submittedAssignmentValidator = require("../validators/assignment.submission.validators");

module.exports = {
  async assignmentSubmit(assignmentDetails) {
    return submittedAssignmentValidator
      .newSubmittedAssignment(assignmentDetails)
      .then(async (validData) => {
        console.log(validData);
        let assignment = await Assignment.findOne({
          _id: validData.assignment_id,
        });
        if (!assignment) throw "This assignment is not eligible now";

        return new AssignmentSubmission(validData).save();
      });
  },

  getAllSubmittedAssignmentsOfClass() {
    return AssignmentSubmission.find().then((assignments) => {
      return assignments;
    });
  },

  async getAssignmentOfACourse(courseId) {
    let assignments = await Assignment.find({
      course_id: courseId,
    });

    if (!assignments) throw "Invalid course ID";
    if (assignments.length === 0) throw "NO Assignments in the given course Id";
    console.log(assignments);

    let submitted = [];

    for (let i = 0; i < assignments.length; i++) {
      let submitass = await AssignmentSubmission.findOne({
        assignment_id: assignments[i]._id,
      });
      if (submitass) submitted.push(submitass);
    }

    if (submitted.length === 0)
      throw "NO Submitted Assignment in the given course Id";

    return submitted;
  },
};
