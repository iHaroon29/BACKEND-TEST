const AssignmentSubmission = require("../../models/mongodb/assignmentSubmissions");

exports.getAllSubmittedAssignment = async (req, res) => {
    const submitted = await AssignmentSubmission.find();
    res.send(submitted);
};

exports.AssignmentSubmissionWithId= async (req, res) => {
    const assignment = await AssignmentSubmission.findOne({
        where: { id: req.params.id },
      });
      if (!assignment) return res.status(400).send("Invalid Assignment submission");
    
    res.send(assignment);
};

