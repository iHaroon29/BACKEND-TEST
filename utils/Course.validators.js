const Joi=require("joi");
const CourseSchema=Joi.object({
    'classroom_id':{
        type:mongoose.ObjectId,
    },
    'title':Joi.string().required(),
    'image':Joi.string().required(),
    'description':Joi.string().required(),
    'price':Joi.number().required(),
    'discount':Joi.number().required(),
    teachers:{
        type:Object, // Teacher's id as key and details as values
        default:{},
    },
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