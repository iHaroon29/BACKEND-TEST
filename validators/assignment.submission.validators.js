const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
module.exports = {
  newSubmittedAssignment(assignmentDetails) {
    const JoiSchema = Joi.object({
      assignment_id: Joi.objectId().required(),
      student_id: Joi.objectId().required(),
      answer_text: Joi.string().required(),
      comments: Joi.string().required(),
    }).options({ stripUnknown: true });
    return JoiSchema.validateAsync(assignmentDetails);
  },
};
