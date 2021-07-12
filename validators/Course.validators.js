const Joi=require("joi");
const CourseSchema=Joi.object({
    'title':Joi.string().required(),
    'description':Joi.string().optional(),
    'image':Joi.string().optional(),
    'price':Joi.number().greater(-1).optional(),
    'discount':Joi.number().greater(-1).optional(),
}).options({stripUnknown:true});
Object.freeze(CourseSchema);

module.exports={
    newCourse(courseDetails){
        return CourseSchema.validateAsync(courseDetails);
    },
    updateCourse(courseDetails){
        const updateCourseSchema=CourseSchema;
        updateCourseSchema["_id"]=Joi.string().required();
        return updateCourseSchema.validateAsync(courseDetails);
    }
};