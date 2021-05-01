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

module.exports.Users = (user) => {
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

module.exports.NewStudentRegistration = (students) => {
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

module.exports.NewHrRounds = (hr_rounds) => {
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

module.exports.NewHrRoundQuestions = (hr_rounds_questions) => {
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


module.exports.NewTeacher = (teachers) => {
  const JoiSchema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });
  const isValid = JoiSchema.validate(teachers);
  return new Promise((resolve, reject) => {
    if (isValid.error) reject(isValid.error);
    resolve(true);
  });
};

module.exports.NewCourseEnrollmentDetails=(data)=>{
//  course original price, course id, discount percentage, enrollment date and time (optional and default of current time)

};

module.exports.StudentEnrollmentDetails=(data)=>{
//  student id, date and time of enrollment, status of enrollment (optional and default of waiting)

};
module.exports.AssignmentSubmissionComments=(data)=>{
// assignment's id, sender's id, sender's type, date and time of comment(optional and default value of current time)

};

module.exports.NewAssignmentSubmission=(data)=>{
//  student's id, assignment id, file or text of submission

};

module.exports.NewCourseSectionMaterial=(data)=>{
// course's id, time stamps and materials (file/text)

};

module.exports.NewTeacherForCourse=(data)=>{
//  teacher's id, course's ids,

};


module.exports.NewCourseSection=()=>{
//  name, description, course's id, material (file/text), timestamps

};

