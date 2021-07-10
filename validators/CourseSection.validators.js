const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  addNewCourseSection(courseSectionDetails) {
    const Schema = Joi.object({
      course_id: Joi.objectId().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      // is_active: Joi.boolean().optional().default(true),
      // 'price':Joi.number().required(),
      // 'discount':Joi.number().required(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(courseSectionDetails);
  },
  updateCourseSection(courseSectionDetails) {
    const Schema = Joi.object({
      course_id: Joi.objectId().optional(),
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      // is_active: Joi.string().optional(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(courseSectionDetails);
  },
  deleteCourseSection(courseSectionDetails) {
    const Schema = Joi.object({
      course_id: Joi.objectId().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      is_active: Joi.string().required(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(courseSectionDetails);
  },
};
