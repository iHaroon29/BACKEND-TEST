const mongoose=require("../../db/mongoDB");


const LectureReschedule=new mongoose.schema("lectureReschedule", {
    'lectureId':{
        type: String,
    },
    'reason':{
        type: String,
    },
    'previous_date':{
        type:Date,
    },
    'nextLectureDetails':{
        type: Date,
    },
    'rescheduled_by':{
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
});

module.exports=LectureReschedule;

