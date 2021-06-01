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


module.exports.NewLoginActivity=(data)=>{
  const Schema=Joi.object({
    user_type:Joi.string().required(),
    user_id:Joi.string().alphanum().min(4).max(15).required(),
    has_logged_out:Joi.boolean().optional().default(false),
    activity:Joi.object({
      created_at:Joi.date().timestamp().optional(),
      updated_at:Joi.date().timestamp().optional(),
    }).optional().options({stripUnknown:true})
  }).options({stripUnknown:true});
  return Schema.validateAsync(data);
};

module.exports.HrRoomComment=(data)=>{
  const Schema=Joi.object({
    user_type:Joi.string().required(),
    user_id:Joi.string().alphanum().min(4).max(15).required(),
    comment:Joi.string().required()


  }).options({stripUnknown:true});
  return Schema.validateAsync(data);
};


module.exports.AddNewTeacherToTakeDemoClass=(data)=>{
  const Schema=Joi.object({
    "teacher_details":Joi.object({
      // "username":Joi.string().required(),
      "password":Joi.string().required(),
      "name":Joi.string().required(),
      "profile_picture":Joi.string().optional(),
      "primary_phone_number":Joi.string().required(),
      "alternate_phone_number":Joi.string().optional(),
      "email":Joi.string().lowercase().required(),
      "last_seen":Joi.date().timestamp().default(Date.now()),
      "country":Joi.string().required(),
      "zip_code":Joi.string().required(),
      "address":Joi.string().required(),
      "is_available":Joi.boolean().default(false)

    }).options({stripUnknown:true}),
    "hr_id":Joi.string().required(),
    "teacher_id":Joi.string().required(),
    "classroom_id":Joi.string().required()

  }).options({stripUnknown:true});
  return Schema.validateAsync(data);
};


module.exports.MakeLogin=(loginDetails)=>{

  const Schema=Joi.object({
    username:Joi.string().email().required(),
    password:Joi.string().required(),
  }).options({stripUnknown:true});
  return Schema.validateAsync(loginDetails);
};

// module.exports.MakeLogOut=(loginDetails)=>{
//
//   const Schema=Joi.object({
//     username:Joi.string().email().required(),
//     password:Joi.string().required(),
//   }).options({stripUnknown:true});
//   return Schema.validateAsync(loginDetails);
// };

module.exports.createNewRoom=(details)=>{
  const Schema = Joi.object({
      members: Joi.object({
        new_hr_applicant:Joi.object(),
        team_leader:Joi.object(),
        hr_advisor:Joi.object()
       }).required().options({stripUnknown:true}),
      room_name: Joi.string().optional().default('New Room'),
      description: Joi.string().optional().default('Welcome')
  }).options({stripUnknown:true});
  return Schema.validateAsync(details)
}