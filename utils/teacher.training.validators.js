const Joi=require("joi");
module.exports={
    addNewTeacherForTraining(teacherDetails){
        return Joi.object({
            classroomDetails:Joi.array().items(Joi.string).required(),
            trainers_id:Joi.array().items(Joi.string).required(),
            teachers_id:Joi.array().items(Joi.string).required(),
            course_id:Joi.array().items(Joi.string).required(),

        }).options({stripUnknown:true}).validateAsync(teacherDetails);
    },
    updateTeacherForTraining(teacherDetails){
        return Joi.object({
            classroomDetails:Joi.array().items(Joi.string).optional(),
            trainers_id:Joi.array().items(Joi.string).optional(),
            teachers_id:Joi.array().items(Joi.string).optional(),
            course_id:Joi.array().items(Joi.string).optional(),

        }).options({stripUnknown:true}).validateAsync(teacherDetails);
    },
};