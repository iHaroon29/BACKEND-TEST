const mongoose=require("../../db/mongoDB");
const CourseTeachers=new mongoose.schema("courseTeacher",{
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
module.exports=CourseTeachers;