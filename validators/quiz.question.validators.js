const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const QuestionSchema=Joi.object({
    question:Joi.string().required(),
    answer:Joi.string().required(),
    options:Joi.array().items(Joi.string()).optional(),
    question_type:Joi.string().required(),
    maximum_marks:Joi.number().greater(0).optional()
}).options({stripUnknown:true});
module.exports={
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