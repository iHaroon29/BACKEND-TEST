const mongoose=require("../../db/mongoDB");

const ClassroomStudentSchema=new mongoose.Schema({
        "classroom_id":{
            type:String,
        },
        "student_id":{
            type:String,
        },
        "is_active":{
            type:Boolean,
            default:true,
        },
    },
    {
        timestamps:true
    });

module.exports=mongoose.model("classroomStudent",ClassroomStudentSchema);


