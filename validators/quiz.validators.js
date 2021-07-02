const Joi=require("joi");
module.exports={
    newQuiz(data){
        return Joi.object({
            quiz_details:Joi.array().items(Joi.object({
                question:Joi.string(),
                answer:Joi.string(),
                options:Joi.array().items(Joi.string).optional(),
                question_type:Joi.string().required()
            })).required()
        }).options({
            stripUnknown:true
        }).validateAsync(data);
    },
    quizSubmission(data){
        return Joi.object({
            user_id:Joi.string().required(),
            user_role:Joi.string().required(),
            quiz_response:Joi.array().items(Joi.object({
                question:Joi.string().required(),
                submitted_answer:Joi.string().required(),
            })),
            course_id:Joi.string().required(),
            quiz_questions_and_answers:Joi.string().required()
        }).validateAsync(data);
    }
};