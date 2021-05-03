/*
 *
 * Network Data Validator module
 *
 */

const Joi = require("joi");


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
  HrRoundQuestions,
  HrRounds
};

module.exports.NewHr=(data)=>{
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    password: Joi.string().required(),
  }).options({stripUnknown:true});
  return JoiSchema.validateAsync(data);
};
module.exports.Login=(data)=>{
  const JoiSchema = Joi.object({
    email:Joi.string().required(),
    password: Joi.string().required(),
  }).options({stripUnknown:true});
  return JoiSchema.validateAsync(data);
};
module.exports.NewHrApplicant=(data)=>{
  const NewHrApplicantSchema=Joi.object({
    full_name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    hr_round_id:Joi.string().optional(),
    primary_mobile_number:Joi.string().required(),
    alt_mobile_number:Joi.string().required(),
    profile_picture:Joi.object({
      filename:Joi.string().required(),
      destination:Joi.string().required(),
    }).options({stripUnknown:true}).optional().default(""),
    cv:Joi.object({
      filename:Joi.string().required(),
      destination:Joi.string().required(),
    }).options({stripUnknown:true}).required(),
    position:Joi.string().required(),
    location:Joi.string().required(),
  }).options({stripUnknown:true});
  return NewHrApplicantSchema.validateAsync(data);
};

