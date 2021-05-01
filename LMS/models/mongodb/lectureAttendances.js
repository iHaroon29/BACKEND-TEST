const mongoose=require("../../db/mongoDB");


const LectureAttendanceSchema=new mongoose.Schema({
    'lectureId':{
        type: String,
    },
    'studentId':{
        type: String,
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
module.exports=mongoose.model("lectureAttendance",LectureAttendanceSchema);