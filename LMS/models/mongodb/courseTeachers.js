const mongoose=require("../../db/mongoDB");
const CourseTeachersSchema=new mongoose.Schema({
    'courseId':{
        type:String,
    },
    'teacherId':{
        type:String,
    },
    'createdAt':{
        type:Date,
        default:Date.now,
    },
    'updatedAt':{
        type:Date,
        default:Date.now,
    },
    'deletedAt':{
        type:Date,
    },
});
module.exports=mongoose.model("courseTeacher",CourseTeachersSchema);