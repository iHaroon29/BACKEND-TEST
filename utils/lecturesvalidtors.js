const Joi=require("joi");

module.exports={
    addNewLectureToClassroom(lectureDetails){
        return Joi.object({
            'classroom_id':Joi.string().required(),
            "course_id":Joi.string().required(),
            'date_and_time':Joi.date().required(),
            'is_attendance_marked':Joi.boolean().optional().default(false),
            'crm_meeting_link':Joi.string().optional(),
            'status':Joi.string().optional().default("new"),
            'is_active':Joi.boolean().optional().default(true)
        }).options({stripUnknown:true}).validateAsync(lectureDetails);

    },
    updateLecture(lectureDetails){
        return Joi.object({
            'classroom_id':Joi.string().optional(),
            "course_id":Joi.string().optional(),
            'date_and_time':Joi.date().optional(),
            'is_attendance_marked':Joi.boolean().optional(),
            'crm_meeting_link':Joi.string().optional(),
            'status':Joi.string().optional(),
            'is_active':Joi.boolean().optional()
        }).options({stripUnknown:true}).validateAsync(lectureDetails);
    }
};