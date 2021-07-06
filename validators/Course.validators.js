const Joi=require("joi");
const CourseSchema=Joi.object({
    'classroom_id':Joi.string().alphanum().lowercase().required(),
    'title':Joi.string().required(),
    // 'image':Joi.string().required(),
    'description':Joi.string().required(),
    "teachers":Joi.array().required(),
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