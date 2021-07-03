const Joi=require("joi");
Joi.objectId = require('joi-objectid')(Joi);


const QuestionSchema=Joi.object({
    question:Joi.string().required(),
    answer:Joi.string().required(),
    options:Joi.array().items(Joi.string()).optional(),
    question_type:Joi.string().required()
}).options({stripUnknown:true});
module.exports={
    newQuiz(data){
        return Joi.object({
            quiz_details:Joi.array().items(QuestionSchema).required()
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
    },
    newQuestion(questionDetails){
        return QuestionSchema.validateAsync(questionDetails);
    },
    deleteQuestion(deleteQuestionDetails){
        return Joi.object({
            courseId:Joi.objectId().required(),
            questionNumber:Joi.number().greater(0)
        }).options({stripUnknown:true}).validateAsync(deleteQuestionDetails);
    },
    updateQuestion(updateQuestion){
        return Joi.object({
            courseId:Joi.objectId().required(),
            questionNumber:Joi.number().greater(0),
            newQuestionDetails:QuestionSchema.required()
        }).options({stripUnknown:true}).validateAsync(updateQuestion);
    }
};