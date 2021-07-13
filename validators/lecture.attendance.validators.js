const Joi=require("joi");

module.exports={
    addNewAttendance(lectureAttendanceDetails){
        return Joi.object({
            student_id:Joi.string().lowercase().required(),
            // course_id:Joi.string().lowercase().required(),
            lecture_id:Joi.string().lowercase().required(),
        }).options({
            stripUnknown:true
        }).validateAsync(lectureAttendanceDetails);
    }
};