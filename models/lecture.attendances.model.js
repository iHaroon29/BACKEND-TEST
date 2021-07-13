const mongoose=require("../db/mongoDB");


const LectureAttendanceSchema=new mongoose.Schema({
        'lecture_id':{
            type: mongoose.ObjectId,
            required:true,
        },
        'student_id':{
            type:  mongoose.ObjectId,
            required:true,
        }
    },
    {
        timestamps:true,
    });
module.exports=mongoose.model("lectureAttendance",LectureAttendanceSchema);