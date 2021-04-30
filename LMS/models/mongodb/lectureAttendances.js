const mongoose=require("../../db/mongoDB");


const LectureAttendance=new mongoose.schema("lectureAttendance",{
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
module.exports=LectureAttendance;