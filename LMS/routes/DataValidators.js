/*
 *
 * Network Data Validator module
 *
 */

const Joi = require("joi");

/*
 *
 * function to validate Users registration data
 *
 */
// module.exports.Users = (user) => {
//   const JoiSchema = Joi.object({
//     id: Joi.number().optional(),
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     email_verified_at: Joi.string().optional(),
//     password: Joi.string().required(),
//   }).options({ abortEarly: false });
//   const isValid = JoiSchema.validate(user);
//   return new Promise((resolve, reject) => {
//     if (isValid.error) reject(isValid.error);
//     resolve(true);
//   });
// };

const Users = (user) => {
  const JoiSchema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    email_verified_at: Joi.string().optional(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });
  const isValid = JoiSchema.validate(user);
  return new Promise((resolve, reject) => {
    if (isValid.error) reject(isValid.error);
    resolve(true);
  });
};

const StudentReg = (students) => {
  const JoiSchema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().required(),
    parentName: Joi.string().required(),
    parentEmail: Joi.string().optional(),
    parentPhone: Joi.number().required(),
    parentAltPhone: Joi.number().optional(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });
  const isValid = JoiSchema.validate(students);
  return new Promise((resolve, reject) => {
    if (isValid.error) reject(isValid.error);
    resolve(true);
  });
};

const HrRounds = (hr_rounds) => {
  const JoiSchema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    applicant_type: Joi.string().required(),
  }).options({ abortEarly: false });
  const isValid = JoiSchema.validate(hr_rounds);
  return new Promise((resolve, reject) => {
    if (isValid.error) reject(isValid.error);
    resolve(true);
  });
};

const HrRoundQuestions = (hr_rounds_questions) => {
  const JoiSchema = Joi.object({
    id: Joi.number().optional(),
    hr_round_id: Joi.number().required(),
    questions: Joi.string().required(),
    question_type: Joi.string().required(),
    can_skip: Joi.boolean().optional(),
  }).options({ abortEarly: false });
  const isValid = JoiSchema.validate(hr_rounds_questions);
  return new Promise((resolve, reject) => {
    if (isValid.error) reject(isValid.error);
    resolve(true);
  });
};

module.exports = {
  Users,
  StudentReg,
  HrRounds,
  HrRoundQuestions,
};
