const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  newCourseMaterial(materialDetails) {
    const JoiSchema = Joi.object({
      course_section_id: Joi.objectId().required(),
      name: Joi.string().required(),
      content: Joi.string().required(),
      topic: Joi.string().required(),
      time_required: Joi.string().required(),
    }).options({ stripUnknown: true });
    return JoiSchema.validateAsync(materialDetails);
  },
};
