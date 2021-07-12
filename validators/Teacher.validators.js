const Joi = require("joi");
const TeacherValidatorSchema=Joi.object({
  name: Joi.string().required(),
  primary_phone_number: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  country: Joi.string().required(),
  zip_code: Joi.number().required(),
  address: Joi.string().required(),
  profile_picture:Joi.string().optional()
}).options({ stripUnknown: true });
module.exports = {
  newTeacher(TeacherDetails) {
    return TeacherValidatorSchema.validateAsync(TeacherDetails);
  },
  updateTeacherDetails(details) {
    const Schema = Joi.object({
      name: Joi.string().optional(),
      primary_phone_number: Joi.number().optional(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
      country: Joi.string().optional(),
      zip_code: Joi.number().optional(),
      address: Joi.string().optional(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(details);
  },
  addNewTeachersUsingArray(teacherDetailsArray){
    return Joi.array().items(TeacherValidatorSchema).default([]).validateAsync(teacherDetailsArray);
  }
};
