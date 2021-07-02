const Joi = require("joi");
module.exports = {
  newTeacher(TeacherDetails) {
    const Schema = Joi.object({
      name: Joi.string().required(),
      primary_phone_number: Joi.number().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      country: Joi.string().required(),
      zip_code: Joi.number().required(),
      address: Joi.string().required(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(TeacherDetails);
  },
  updateTeacherDetails(details) {
    const Schema = Joi.object({
      name: Joi.string().optional(),
      primary_phone_number: Joi.number().optional(),
      email: Joi.string().optional(),
      // password: Joi.string().optional(),
      country: Joi.string().optional(),
      zip_code: Joi.number().optional(),
      address: Joi.string().optional(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(details);
  },
};
