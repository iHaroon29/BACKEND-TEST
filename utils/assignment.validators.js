const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
module.exports = {
  newAssignment(assignment) {
    console.log(assignment);

    const JoiSchema = Joi.object({
      course_id: Joi.objectId().required(),
      teacher_id: Joi.objectId().required(),
      instructions: Joi.string().required(),
      description: Joi.string().required(),
      last_submission_date: Joi.string().required(),
    }).options({ stripUnknown: true });
    return JoiSchema.validateAsync(assignment);
  },

  updateAssignmentDetails(assignmentDetails) {
    const JoiSchema = Joi.object({
      course_id: Joi.objectId().optional(),
      teacher_id: Joi.objectId().optional(),
      instructions: Joi.string().optional(),
      description: Joi.string().optional(),
      last_submission_date: Joi.date().optional(),
    }).options({ stripUnknown: true });
    return JoiSchema.validateAsync(assignmentDetails);
  },
};
