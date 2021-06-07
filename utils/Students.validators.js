const Joi = require("joi");
module.exports = {
  newStudent(StudentDetails) {
    const Schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      parent_name: Joi.string().required(),
      parent_relation: Joi.string().required(),
      parent_email: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(StudentDetails);
  },
};
