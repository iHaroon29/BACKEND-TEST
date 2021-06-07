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
};
