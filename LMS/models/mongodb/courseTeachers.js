const mongoose=require("../../db/mongoDB");
const CourseTeachersSchema=new mongoose.Schema({
    'courseId':{
        type:String,
    },
    'teacherId':{
        type:String,
    }
},
    {
        timestamps:true
    });
module.exports=mongoose.model("courseTeacher",CourseTeachersSchema);