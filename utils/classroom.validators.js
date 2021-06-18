const Joi = require("joi");
const ClassroomSchema = Joi.object({
  name: Joi.string().required(),
  timeline: Joi.object().optional().default({}),
  status: Joi.string().optional().default("verified"),
  classroom_type: Joi.string().optional().default("demo"),
  students: Joi.array().optional().items(Joi.string()).default([]),
  courses: Joi.array().optional().items(Joi.string()).default([]),
}).options({ stripUnknown: true });
module.exports = {
  newClassroom(classroomDetails) {
    return ClassroomSchema.validateAsync(classroomDetails);
  },
  updateClassroomDetails(details) {
    const UpdateSchema = Joi.object({
      name: Joi.string().optional(),
      timeline: Joi.object().optional().default({}),
      status: Joi.string().optional(),
      classroom_type: Joi.string(),
    }).options({ stripUnknown: true });
    return UpdateSchema.validateAsync(details);
  },
};
