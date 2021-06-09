const Joi=require("joi");
module.exports={
    addNewCourseSection(courseSectionDetails){
        const Schema=Joi.object({
            "course_id":Joi.string().required(),
            'name':Joi.string().required(),
            "description":Joi.string().required(),
            'is_active':Joi.boolean().optional().default(true),
        }).options({stripUnknown:true});
        return Schema.validateAsync(courseSectionDetails);
    },
    updateCourseSection(courseSectionDetails){
        const Schema=Joi.object({
            "course_id":Joi.string().optional(),
            'name':Joi.string().optional(),
            "description":Joi.string().optional(),
            'is_active':Joi.string().optional(),
        }).options({stripUnknown:true});
        return Schema.validateAsync(courseSectionDetails);
    },
    deleteCourseSection(courseSectionDetails){
        const Schema=Joi.object({
            "course_id":Joi.string().required(),
            'name':Joi.string().required(),
            "description":Joi.string().required(),
            'is_active':Joi.string().required(),
        }).options({stripUnknown:true});
        return Schema.validateAsync(courseSectionDetails);
    },

};